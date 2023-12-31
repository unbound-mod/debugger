import CodeArea from "./components/CodeArea";

function App() {
  return (
    <div style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'flex', 
        "flex-direction": 'row', 
        margin: 0,
        padding: 0
    }}>
        <CodeArea />
    </div>
  );
}

export default App;
