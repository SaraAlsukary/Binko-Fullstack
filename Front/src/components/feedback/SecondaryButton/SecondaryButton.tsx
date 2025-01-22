import { TButton } from '@customtypes/buttonType';
import style from './SecondaryButton.module.css';
const { buttn } = style;
const SecondaryButton = ({ children, style, className, onClick, disabled }: TButton) => {
    return (
        <button disabled={disabled} onClick={onClick} style={style} className={` ${buttn} ${className}`}>{children}</button>

    )
}

export default SecondaryButton
