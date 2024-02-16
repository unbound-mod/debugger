import Monaco from '@uwu/monaco-solid';
import Theme from '@/lib/monaco.dark.json';

type MonacoProps = {
    code: () => string;
    setCode: (...args: any) => string
    readonly?: boolean;
    language?: string
}

export default ({ code, setCode, readonly = false, language = 'typescript' }: MonacoProps) => {
    return <div style={{ flex: 0.5 }}>
         <Monaco
            lang={language}
            value={code()}
            valOut={setCode}
            theme={['Unbound', Theme as any]}
            readonly={readonly}
            width='100%'
            height='100%'
            otherCfg={{
                automaticLayout: true,
                fontFamily: 'Menlo',
                fontLigatures: true
            }}
        />
    </div>
};