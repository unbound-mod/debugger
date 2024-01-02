use std::{
    collections::HashMap,
    io::ErrorKind,
    net::{IpAddr, SocketAddr, TcpListener as Std__TcpListener},
    str::FromStr,
    sync::{Arc, Mutex},
};

use futures_channel::mpsc::{unbounded, UnboundedSender};
use futures_util::{future, pin_mut, stream::TryStreamExt, StreamExt};

use tokio::net::{TcpListener, TcpStream};
use tokio_tungstenite::{accept_async, tungstenite::protocol::Message};

use serde_json::{Result, Value};

type Tx = SenderWithAddr<Message>;
type Clients = Arc<Mutex<HashMap<SocketAddr, Tx>>>;

struct SenderWithAddr<T> {
    sender: UnboundedSender<T>,
    addr: SocketAddr,
}

impl<T> SenderWithAddr<T> {
    fn new(sender: UnboundedSender<T>, addr: SocketAddr) -> Self {
        SenderWithAddr { sender, addr }
    }
}

pub async fn create_server(host: IpAddr, port: u16) {
    let listener = TcpListener::bind((host, port)).await.unwrap();
    println!("Server listening on {}", port);

    let clients = Clients::new(Mutex::new(HashMap::new()));

    tokio::spawn(async move {
        loop {
            let res = listener.accept().await;

            match res {
                Ok((stream, addr)) => {
                    tokio::spawn(handle_connection(clients.clone(), stream, addr));
                }

                Err(e) => {
                    eprintln!("Failed to accept connection: {}", e);
                }
            }
        }
    });
}

async fn handle_connection(clients: Clients, stream: TcpStream, addr: SocketAddr) {
    println!("Incoming TCP connection from: {}", addr);

    let ws_stream = accept_async(stream)
        .await
        .expect("Error during the websocket handshake occurred");
    println!("WebSocket connection established: {}", addr);

    let (tx, rx) = unbounded();
    let tx = SenderWithAddr::new(tx, addr);
    clients.lock().unwrap().insert(addr, tx);

    let (outgoing, incoming) = ws_stream.split();

    let broadcast_incoming = incoming.try_for_each(|msg| {
        let connections = clients.lock().unwrap();
        let msg_string = msg
            .into_text()
            .expect("Failed to convert message into string!");
        let msg_json: Result<HashMap<String, Value>> = serde_json::from_str(&msg_string);

        let data = match msg_json {
            Ok(res) => res,
            Err(_) => {
                let mut res = HashMap::new();
                res.insert("content".to_string(), Value::String(msg_string));

                res
            }
        };

        // Get all of the connections which aren't this connection
        let broadcast_recipients = connections
            .iter()
            .filter(|(peer_addr, _)| peer_addr != &&addr)
            .map(|(_, ws_sink)| ws_sink);

        let content = match data.get("content") {
            Some(content) => content
                .as_str()
                .expect("Failed to convert content to string."),
            None => "null",
        };

        println!("Received a message from {}: {}", addr, content);

        for recp in broadcast_recipients {
            println!("Sending the message to {}", recp.addr);

            recp.sender
                .unbounded_send(Message::Text(content.to_string()))
                .unwrap();
        }

        future::ok(())
    });

    let receive_from_others = rx.map(Ok).forward(outgoing);

    pin_mut!(broadcast_incoming, receive_from_others);
    future::select(broadcast_incoming, receive_from_others).await;

    println!("{} disconnected", &addr);
    clients.lock().unwrap().remove(&addr);
}

pub async fn get_host_and_port(start_port: u16) -> (IpAddr, u16) {
    let mut port = start_port;
    let host = IpAddr::from_str("0.0.0.0").unwrap();

    loop {
        match Std__TcpListener::bind((host, port)) {
            Ok(listener) => {
                drop(listener);
                break (host, port);
            }
            Err(ref err) if err.kind() == ErrorKind::AddrInUse => {
                port += 1;
            }
            Err(err) => {
                panic!("Error binding to port: {}", err);
            }
        }
    }
}
