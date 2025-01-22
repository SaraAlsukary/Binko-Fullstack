import { useAppDispatch, useAppSelector } from '@hooks/app';
import style from './Navbar.module.css';
import { authLogout } from '@store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const { navbar, logo, users } = style;
const Navbar = () => {
    const { user } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    return (
        <div className={navbar}>
            <span className={logo}>Sara Alsukary</span>
            <div className={users}>
                <img src={user?.image} onClick={() => navigate('/Binko/profile')} alt="" />
                <span>{user?.name}</span>
                <button onClick={() => dispatch(authLogout())}>logout</button>
            </div>
        </div>
    )
}

export default Navbar