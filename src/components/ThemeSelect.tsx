import { Show, For, createSignal, createResource, createEffect } from 'solid-js';
import fetchThemes from '../lib/fetchThemes';

const [data] = createResource(fetchThemes);
export const [theme, setTheme] = createSignal(localStorage.getItem('theme') ?? 'Dracula');

createEffect(() => {
    localStorage.setItem('theme', theme());
})

export default () => {
    return <Show when={!data?.loading} fallback="Loading...">
        <select value={theme()} onChange={(e) => setTheme(e.target.value)}>
            <For each={data() as any[]}>
                {(item) => (
                    <option value={item}>{item}</option>
                )}
            </For>
        </select>
    </Show>
}