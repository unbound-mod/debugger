import { createSignal } from "solid-js";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetingMessage, setGreetingMessage] = createSignal("Press the 'Greet' Button above to greet the user!");
  const [name, setName] = createSignal("");
  const [count, setCount] = createSignal(0);

  async function greet() {
    const possibleName = name();

    if (!possibleName) {
        return setGreetingMessage("Press the 'Greet' Button above to greet the user!");
    }

    setGreetingMessage(await invoke("greet", { name: possibleName }));
  }

  return (
    <div class="container">
      <h1>Welcome to Tauri!</h1>
      <form
        class="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetingMessage()}</p>

      <form
        class="row"
        onSubmit={(e) => {
            e.preventDefault();
            setCount(prev => prev + 1);
        }}
      >
        <h3 style={{ "margin-right": '1em' }}>{count()}</h3>
        <button type="submit">Increase Count</button>
      </form>
    </div>
  );
}

export default App;
