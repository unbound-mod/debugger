import connect from '../lib/connect';
import CodeEditor from './CodeEditor';
import ThemeSelect from './ThemeSelect';

export default () => {
    return (
        <div style={{ 
            display: 'flex', 
            width: '100%',
            'flex-direction': 'column', 
        }}>
            <button onClick={connect}>Get websocket URL (check console)</button>
            <text style={{ 'font-size': '0.7rem', 'text-align': 'center' }}>
                This starts a new WebSocketServer first if one hasn't been initialized already.
            </text>
            <hr />
            <CodeEditor />
            <ThemeSelect />
        </div>
    )
}