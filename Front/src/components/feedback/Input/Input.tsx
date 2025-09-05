import Style from './Input.module.css';
import { TInput } from '@customtypes/inputType';
const { inputStyle } = Style;


const Input = ({ value, type, placeholder, style,checked, onClick, onFocus, onChange, register, name ,id}: TInput) => {
    return <input checked={checked} id={id! as any} name={name} {...register} onClick={onClick} value={value} type={type} style={style} onChange={onChange} onFocus={onFocus} className={inputStyle} placeholder={placeholder} />
}

export default Input