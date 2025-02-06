import { Container } from 'react-bootstrap'
import Moon from '@assets/svgs/moon.svg?react';
import Sun from '@assets/svgs/sun.svg?react'
import './Header.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { changeThemeToDark, changeThemeToLight } from '@store/themeSlice/themeSlice'
import { changeLanguageToArabic, changeLanguageToEnglish } from '@store/languageSlice/languageSlice'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import { useState } from 'react';
import { actLogout, authLogout } from '@store/auth/authSlice';
const Header = () => {
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const { language } = useAppSelector(state => state.language);
    const { user } = useAppSelector(state => state.auth)

    const changeToDark = () => {
        dispatch(changeThemeToDark());

    }
    const changeToLight = () => {
        dispatch(changeThemeToLight())

    }
    const changeToEnglish = () => {
        dispatch(changeLanguageToEnglish());


    }

    const changeToArabic = () => {
        dispatch(changeLanguageToArabic());
    }
    const navigate = useNavigate();

    const logoutHandler = async () => {
        // dispatch(actLogout())
        //     .unwrap()
        //     .then(
        //         () => {
        //             navigate('/Binko/');

        //         }
        //     )

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            dispatch(authLogout())
            navigate('/Binko/');

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <header className="headerSuper">
            <Container className='content'>
                <div className='logo'><NavLink to='/Binko/supervisor'>{language === 'English' ? 'Admin Dashboard' : 'لوحة تحكم الأدمن'}</NavLink></div>
                <ul className='list'>
                    {theme === 'Light' ? <li onClick={changeToDark}>
                        <Moon style={{ width: '30px', height: '30px', cursor: 'pointer' }} /></li> :
                        <li onClick={changeToLight}><Sun style={{ width: '30px', cursor: 'pointer', height: '30px' }} /></li>}
                    <li >
                        <select onChange={(e) => { e.target.size = 1; e.target.blur() }} onBlur={(e) => { e.target.size = 0 }} onFocus={(e) => { e.target.size = 2 }} name="language" value={language === "Arabic" ? "العربية" : "English"} style={theme === 'Dark' ? { color: 'white' } : { color: 'black' }}>
                            <option value="Arabic" onClick={changeToArabic}>{language === 'English' ? 'Arabic' : 'العربية'}</option>
                            <option value="English" onClick={changeToEnglish}>{language === 'English' ? 'English' : 'الانجليزية'} </option>
                        </select>
                    </li>
                    <li onClick={() => setShow(!show)} className='pro'><div className={theme === 'Dark' ? `prof dark` : `prof`}>{user?.username} {show ? <i className='pi pi-angle-up'></i> : <i className='pi pi-angle-down'></i>}</div></li>
                    <li><ul className={show ? 'list2 show' : 'list2'}>
                        <li><NavLink to='profile'>{user?.name}</NavLink></li>
                        <li>{user?.username}</li>
                        <li onClick={logoutHandler}>{language === 'English' ? "Logout" : "تسجيل الخروج"}</li>
                    </ul></li>

                </ul>
            </Container>
        </header>
    )
}

export default Header
