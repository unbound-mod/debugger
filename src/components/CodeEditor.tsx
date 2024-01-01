import { createSignal, createEffect } from 'solid-js';
import { transpile } from 'typescript';
import Monaco from './Monaco';

export const [code, setCode] = createSignal('');
export const [transpiledCode, setTranspiledCode] = createSignal('');

createEffect(() => {
    setTranspiledCode(transpile(code()));
})

export default () => {
    return <>
        <Monaco 
            code={code} 
            setCode={setCode}
        />

        <Monaco  
            code={transpiledCode} 
            setCode={setTranspiledCode}
            language='javascript'
            readonly
        />
    </>    
}