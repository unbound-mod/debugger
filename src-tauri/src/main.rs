#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use lazy_static::lazy_static;
use tokio::sync::Mutex;

mod socket;
use socket::{create_server, find_available_port};

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
    let port = find_available_port(start_port).await;
    let uri = format!("ws://127.0.0.1:{}", port);

    *server_uri = Some(uri.clone());
    create_server(port).await;

    uri
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_server_uri])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
