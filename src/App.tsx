import CodeArea from './components/CodeArea';

function App() {
  return (
    <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        overflow: 'hidden',
        'flex-direction': 'row'
    }}>
        <CodeArea />
    </div>
  );
}

export default App;
