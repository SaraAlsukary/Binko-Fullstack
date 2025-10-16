import LogoIcon from '../LogoIcon/LogoIcon';
import Styles from './Header.module.css';
import Moon from '@assets/svgs/moon.svg?react';
import BurgerBlack from '@assets/svgs/burgerMenuBlack.svg?react';
import BurgerWhite from '@assets/svgs/burgerMenuWhite.svg?react';
import Close from '@assets/svgs/close.svg?react';
import Search from '@components/feedback/Search/Search';
import SearchGreen from '@assets/svgs/searchGreen.svg?react';
import { changeThemeToDark, changeThemeToLight } from '@store/themeSlice/themeSlice'
import Sun from '@assets/svgs/sun.svg?react'
import ProfileIcon from '@assets/svgs/profile.svg?react'
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from '@components/feedback';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { changeLanguageToArabic, changeLanguageToEnglish } from '@store/languageSlice/languageSlice';
import { Container } from 'react-bootstrap';
import actGetUsers from '@store/usersSlice/act/actGetUsers';
const { headerContainer, closeIcon, searchIcon, navStyle, icon, burger, show } = Styles;
const Header = () => {
    const [toggle, setToggle] = useState(false);
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const { language } = useAppSelector(state => state.language);
    const { userData } = useAppSelector(state => state.auth)
    const location: any = useLocation();
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
                <div className={icon}><NavLink to='/Binko'> <LogoIcon /></NavLink></div>
                <Search className="showInput" isThereNavigate={true} checkLocate={location.pathname === '/Binko/booksSearch' ? true : false} />

                <nav className={navStyle} >
                    <ul className={toggle ? `${show}` : ''}>
                        {theme === 'Light' ? <li onClick={changeToDark}>
                            <Moon style={{ width: '30px', height: '30px', cursor: 'pointer' }} /></li> :
                            <li onClick={changeToLight}><Sun style={{ width: '30px', cursor: 'pointer', height: '30px' }} /></li>}
                        <li  ><NavLink to='booksSearch' className={theme === 'Dark' ? `dark` : `light`} >
                            <div className={searchIcon}>
                                <SearchGreen style={language === 'Arabic' ? { width: '100%', height: '100%', position: 'absolute', right: '0' } : {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    left: "0"
                                }} />
                            </div>
                        </NavLink></li>
                        <li  ><NavLink to='/Binko/home'  >{language === 'English' ? 'Home' : 'الرئيسية'}</NavLink></li>
                        <li ><NavLink to='news'   >{language === 'English' ? 'News' : 'الأخبار'}</NavLink></li>
                        <li ><NavLink to='categories' >{language === 'English' ? 'Categories' : 'التصنيفات'}</NavLink></li>
                        <li  ><NavLink to='about'  >{language === 'English' ? 'About' : 'عنا'}</NavLink></li>
                        <li  ><NavLink to='sub'  >{language === 'English' ? 'Subscription' : 'الاشنراك'}</NavLink></li>


                        <li >
                            <select onChange={(e) => { e.target.size = 1; e.target.blur() }} onBlur={(e) => { e.target.size = 0 }} onFocus={(e) => { e.target.size = 2 }} name="language" value={language === "Arabic" ? "العربية" : "English"} style={theme === 'Dark' ? { color: 'white' } : { color: 'black' }}>
                                <option value="Arabic" onClick={changeToArabic}>{language === 'English' ? 'Arabic' : 'العربية'}</option>
                                <option value="English" onClick={changeToEnglish}>{language === 'English' ? 'English' : 'الانجليزية'} </option>
                            </select>
                        </li>
                        {userData ?
                            <li><NavLink to='profile' >
                                {/* <div className={theme === 'Dark' ? `${prof} ${dark}` : `${prof}`}>
                                </div> */}
                                <ProfileIcon style={{ width: "35px", height: "35px" }} />
                            </NavLink></li>

                            : <li><Button ><NavLink to='Login' style={{ color: 'black' }}>{language === 'Arabic' ? 'تسجبل الدخول' : "login"}</NavLink></Button></li>
                        }</ul>


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
