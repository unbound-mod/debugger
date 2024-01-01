import { theme } from './ThemeSelect';
import Monaco from "monaco-solid";

type MonacoProps = {
    code: () => string;
    setCode: (...args: any) => string
    readonly?: boolean;
    language?: string
}

export default ({ code, setCode, readonly = false, language = 'typescript' }: MonacoProps) => {
    return (
        <div style={{ display: 'flex', 'flex-direction': 'column', flex: 0.5 }}>
            {language.charAt(0).toUpperCase() + language.slice(1)}
            <Monaco
                lang={language}
                value={code()}
                valOut={setCode}
                theme={theme()}
                readonly={readonly}
                width="100%"
                height="100%"
                otherCfg={{
                    automaticLayout: true,
                    inlayHints: {
                        enabled: true,
                    }
                }}
            />
        </div>
    );
};