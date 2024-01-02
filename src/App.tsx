import CodeArea from './components/CodeArea';
import Output from './components/Output';

function App() {
  return (
    <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        overflow: 'hidden',
        'flex-direction': 'row',
    }}>
        <CodeArea />
        <Output />
    </div>
  );
}

export default App;
