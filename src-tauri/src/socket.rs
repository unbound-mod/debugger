use std::io::ErrorKind;
use std::net::TcpListener as Std__TcpListener;
use tokio::net::{TcpListener, TcpStream};

pub async fn find_available_port(start_port: u16) -> u16 {
    let mut port = start_port;

    loop {
        match Std__TcpListener::bind(("127.0.0.1", port)) {
            Ok(listener) => {
                drop(listener);
                break port;
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

async fn handle_connection(stream: TcpStream) {
    // let (reader, mut writer) = stream.into_split();
    // let mut reader = tokio::io::BufReader::new(reader);
    // let mut writer = tokio::io::BufWriter::new(writer);

    loop {
        // let mut buffer = String::new();
    }
}

pub async fn create_server(port: u16) {
    tokio::spawn(async move {
        let listener = TcpListener::bind(("127.0.0.1", port)).await.unwrap();

        println!("Server listening on port {}", port);

        while let Ok((stream, _)) = listener.accept().await {
            tokio::spawn(handle_connection(stream));
        }
    });
}
