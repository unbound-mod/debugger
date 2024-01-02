#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use hostname::get;
use lazy_static::lazy_static;
use tokio::sync::Mutex;

mod socket;
use socket::{create_server, get_host_and_port};

lazy_static! {
    static ref SERVER_URI: Mutex<Option<String>> = Mutex::new(None);
}

#[tauri::command]
async fn get_server_uri() -> String {
    let mut server_uri = SERVER_URI.lock().await;
    if let Some(uri) = &*server_uri {
        return uri.clone();
    }

    let start_port: u16 = 5253;
    let (host, port) = get_host_and_port(start_port).await;

    let host_os_str = get().expect("Failed to get hostname.");
    let host_str = host_os_str
        .to_str()
        .expect("Failed to convert hostname to &str");
    let uri = format!("ws://{}:{}", host_str, port);
    *server_uri = Some(uri.clone());

    create_server(host, port).await;
    uri
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_server_uri])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
