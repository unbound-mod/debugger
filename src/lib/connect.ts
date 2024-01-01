import invoke, { Commands } from "./invoke";

export let socket: WebSocket;

async function connect() {
    const serverUri = await invoke<string>(Commands.GET_SERVER_URI).catch(console.error);

    console.log(serverUri);
}

export default connect;