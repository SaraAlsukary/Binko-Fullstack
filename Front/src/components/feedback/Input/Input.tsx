import Style from './Input.module.css';
import { TInput } from '@customtypes/inputType';
const { inputStyle } = Style;


const Input = ({ value, type, placeholder, style, onClick, onFocus, onChange }: TInput) => {
    return <input onClick={onClick} value={value} type={type} style={style} onChange={onChange} onFocus={onFocus} className={inputStyle} placeholder={placeholder} />
}

export default Input