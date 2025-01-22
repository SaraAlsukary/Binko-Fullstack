import Style from './SecondaryInput.module.css';
import { TInput } from '@customtypes/inputType';
const { inputStyle } = Style;


const SecondaryInput = ({ value, type, placeholder, style, onFocus, onChange }: TInput) => {
    return <input value={value} type={type} style={style} onChange={onChange} onFocus={onFocus} className={inputStyle} placeholder={placeholder} />
}

export default SecondaryInput;