import LogoIcon from '../../common/LogoIcon/LogoIcon';
import Styles from './Header.module.css';
import Moon from '@assets/svgs/moon.svg?react';
import BurgerBlack from '@assets/svgs/burgerMenuBlack.svg?react';
import BurgerWhite from '@assets/svgs/burgerMenuWhite.svg?react';
import Close from '@assets/svgs/close.svg?react';
import { changeThemeToDark, changeThemeToLight } from '@store/themeSlice/themeSlice'
import Sun from '@assets/svgs/sun.svg?react'
import { NavLink } from 'react-router-dom';
import { Button } from '@components/feedback';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { changeLanguageToArabic, changeLanguageToEnglish } from '@store/languageSlice/languageSlice';
import { Container } from 'react-bootstrap';
import actGetUsers from '@store/usersSlice/act/actGetUsers';
const { headerContainer, closeIcon, searchIcon, navStyle, icon, prof, burger, show, dark } = Styles;
const Header = () => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const { language } = useAppSelector(state => state.language);

    useEffect(() => {
        dispatch(actGetUsers())
    }, [])
    const showToggleHandler = () => {
        setToggle(!toggle);
    }

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
    const closeToggle = () => {
        setToggle(false);

    }
    return (
        <header>
            <Container className={headerContainer} >
                <div className={icon}><NavLink to='/'> <LogoIcon /></NavLink></div>

                <nav className={navStyle} >
                    <ul className={toggle ? `${show}` : ''}>
                        {theme === 'Light' ? <li onClick={changeToDark}>
                            <Moon style={{ width: '30px', height: '30px', cursor: 'pointer' }} /></li> :
                            <li onClick={changeToLight}><Sun style={{ width: '30px', cursor: 'pointer', height: '30px' }} /></li>}

                        <li  ><NavLink to='/Binko/home'  >{language === 'English' ? 'Home' : 'الرئيسية'}</NavLink></li>
                        <li ><NavLink to='/Binko/news'   >{language === 'English' ? 'News' : 'الأخبار'}</NavLink></li>
                        <li  ><NavLink to='/Binko/about'  >{language === 'English' ? 'About' : 'عنا'}</NavLink></li>


                        <li>
                            <select onChange={(e) => { e.target.size = 1; e.target.blur() }} onBlur={(e) => { e.target.size = 0 }} onFocus={(e) => { e.target.size = 2 }} name="language" value={language === "Arabic" ? "العربية" : "English"} style={theme === 'Dark' ? { color: 'white' } : { color: 'black' }}>
                                <option value="Arabic" onClick={changeToArabic}>{language === 'English' ? 'Arabic' : 'العربية'}</option>
                                <option value="English" onClick={changeToEnglish}>{language === 'English' ? 'English' : 'الانجليزية'} </option>
                            </select>
                        </li>

                        <li><Button ><NavLink to='/Binko/Login' style={{ color: 'black' }}>{language === 'Arabic' ? 'تسجبل الدخول' : "login"}</NavLink></Button></li>
                    </ul>


                </nav >
                {theme === 'Light' ?
                    <div className={burger}
                        onClick={showToggleHandler}>
                        <BurgerBlack style={{ width: '100%' }} />
                    </div>
                    : <div className={burger}
                        onClick={showToggleHandler}>
                        <BurgerWhite style={{ width: '100%' }} />
                    </div>
                }
                {toggle ?
                    <div onClick={() => closeToggle()} className={closeIcon}>
                        <Close style={{ width: '30px' }} />
                    </div> : ''}
            </Container>
        </header >
    )
}

export default Header
