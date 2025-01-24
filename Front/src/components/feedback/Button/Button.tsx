import { TButton } from '@customtypes/buttonType';
import Style from './Button.module.css';
const { buttonStyle } = Style;


const Button = ({ children, style, className, onClick, disabled, onSubmit, type }: TButton) => {
    return (
        <button type={type} onSubmit={onSubmit} disabled={disabled} onClick={onClick} style={style} className={` ${buttonStyle} ${className}`}>{children}</button>
    )
}

export default Button
