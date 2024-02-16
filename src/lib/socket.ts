import { transpiledCode } from '@/components/CodeEditor';
import { setOutput } from '@/components/Output';
import invoke, { Commands } from './invoke';
import { createSignal } from 'solid-js';

export const [socket, setSocket] = createSignal<WebSocket>();
export const [uri, setUri] = createSignal<string>();

export async function init() {
    const serverUri = await invoke<string>(Commands.GET_SERVER_URI).catch(console.error);

    if (!serverUri) return alert('Failed to start server or failed to get server URI!');

    setUri(uri);
    setSocket(new WebSocket(serverUri));

    socket()?.addEventListener('message', (e) => {
        setOutput((p) => [...p, e.data])
    })
}

export function sendCode() {
    const socketInstance = socket();

    if (!socketInstance || socketInstance.readyState !== socketInstance.OPEN)
        return alert('WebSocket is not connected!');

    socketInstance.send(transpiledCode())
}