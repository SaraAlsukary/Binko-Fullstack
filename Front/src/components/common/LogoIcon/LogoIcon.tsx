import logo from '@assets/imgs/logo.png'
import style from './LogoIcon.module.css';
const { log } = style
const LogoIcon = () => {
    return (
        <img className={log} src={logo} alt="logo" />
    )
}

export default LogoIcon
