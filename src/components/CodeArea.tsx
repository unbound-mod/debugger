import TextArea from './Monaco';
import ThemeSelect from './ThemeSelect';


export default () => {
    return (<div style={{ display: 'flex', "flex-direction": 'column', width: '100vw' }}>
        <ThemeSelect />
        <TextArea />
    </div>)
}