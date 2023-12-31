import { createSignal } from "solid-js";
import Monaco from "monaco-solid";
import { theme } from './ThemeSelect';

export const [code, setCode] = createSignal("");

export default () => {
    return (
        <Monaco
            lang="typescript"
            value={code()}
            valOut={setCode}
            theme={theme()}
            readonly={false}
            width="100%"
            height="100%"
            otherCfg={{
                automaticLayout: true,
                inlayHints: {
                    enabled: true,
                }
            }}
        />
    );
};