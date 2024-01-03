import { For, createSignal } from 'solid-js';

export const [output, setOutput] = createSignal<string[]>([]);

export default () => {
    return <div style={{ flex: 0.5 }}>
        <h2 style={{ "text-align": "center" }}>Output</h2>
        <For each={output()}>
            {(item) => {
                return <p>{item}</p>
            }}
        </For>
    </div>
}