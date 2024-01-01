import { invoke as _invoke, InvokeArgs } from '@tauri-apps/api/tauri';

const Commands = {
    GET_SERVER_URI: 'get_server_uri'
} as const;

const invoke: <T>(cmd: typeof Commands[keyof typeof Commands], args?: InvokeArgs) => Promise<T> = _invoke;

export { invoke, Commands };
export default invoke;
