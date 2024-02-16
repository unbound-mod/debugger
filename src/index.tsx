import { render } from 'solid-js/web';
import { ColorModeProvider, ColorModeScript, cookieStorageManager } from '@kobalte/core'

import App from './App';
import { init } from '@/lib/socket';

function Root() {
    return <>
        <ColorModeScript storageType={cookieStorageManager.type} />
        <ColorModeProvider storageManager={cookieStorageManager}>
            <App />
        </ColorModeProvider>
    </>
}

render(() => <Root />, document.getElementById('root') as HTMLElement);
init();