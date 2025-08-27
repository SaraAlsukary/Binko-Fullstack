import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css';
import Home from '@assets/svgs/home.svg?react';
import HomeWhite from '@assets/svgs/homeWhite.svg?react';
import Notify from '@assets/svgs/notification.svg?react';
import NotifyWhite from '@assets/svgs/notification-white.svg?react';
import BookMark from '@assets/svgs/bookMark.svg?react';
import BookMarkWhite from '@assets/svgs/bookMarkWhite.svg?react'
import AddBook from '@assets/svgs/addBook.svg?react';
import AddBookWhite from '@assets/svgs/addBookWhite.svg?react';
import BookMarkActive from '@assets/svgs/bookmarkActive.svg?react';
import BurgerMenu from '@assets/svgs/burgerMenuBlack.svg?react';
import BurgerMenuWhite from '@assets/svgs/burgerMenuWhite.svg?react';
import { useAppSelector } from '@hooks/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import actGetNotificationsCounts from '@store/notifications/act/actGetNotificationsCounts';
const { settings, list, icons, icon, count, redCircle } = styles
const Menu = () => {
    const { theme } = useAppSelector(state => state.theme);
    const { userData } = useAppSelector(state => state.auth);
    const { notificationsCount } = useAppSelector(state => state.notifications);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actGetNotificationsCounts(userData?.user?.id!));
    }, [notificationsCount])
    return (

        <div className={settings}>
            <ul className={list}>
                <li>
                    <NavLink to='/Binko/home'>
                        {theme === 'Light' ? <div className={icons}>
                            <div className='mark' style={{ backgroundColor: 'transparent' }}>
                                <BookMarkActive style={{ widht: '100px', height: '100px' }} />
                            </div>
                            <Home className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} />
                        </div>
                            :
                            <div className={icons}>
                                <div className="mark" style={{ backgroundColor: 'transparent' }}>
                                    <BookMarkActive style={{ widht: '100px', height: '100px' }} />
                                </div>
                                <HomeWhite className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} />
                            </div>}
                    </NavLink>
                </li>
                <li><NavLink to='addBook'>{theme === 'Light' ? <div className={icons}><div className='mark' style={{ backgroundColor: 'transparent' }}><BookMarkActive style={{ widht: '100px', height: '100px' }} /></div><AddBook className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} /></div> : <div className={icons}><div className="mark" style={{ backgroundColor: 'transparent' }}><BookMarkActive style={{ widht: '100px', height: '100px' }} /></div> <AddBookWhite className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} /></div>}</NavLink></li>
                <li>
                    <NavLink className={count} to='notifications'>
                        {notificationsCount ? <div className={redCircle}>
                            <span>{notificationsCount}</span>
                        </div> : ""}
                        {theme === 'Light' ? <div className={icons}>
                            <div className='mark' style={{ backgroundColor: 'transparent' }}>
                                <BookMarkActive style={{ widht: '100px', height: '100px' }} />
                            </div>
                            <Notify className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} />
                        </div>
                            :
                            <div className={icons}>
                                <div className="mark" style={{ backgroundColor: 'transparent' }}>
                                    <BookMarkActive style={{ widht: '100px', height: '100px' }} />
                                </div>
                                <NotifyWhite className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} />
                            </div>}
                    </NavLink>
                </li>
                <li><NavLink to='favorite'>{theme === 'Light' ? <div className={icons}><div className='mark' style={{ backgroundColor: 'transparent' }}><BookMarkActive style={{ widht: '100px', height: '100px' }} /></div><BookMark className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} /></div> : <div className={icons}><div className="mark" style={{ backgroundColor: 'transparent' }}><BookMarkActive style={{ widht: '100px', height: '100px' }} /></div> <BookMarkWhite className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} /></div>}</NavLink></li>
                <li><NavLink to='settings'>{theme === 'Light' ? <div className={icons}><div className='mark' style={{ backgroundColor: 'transparent' }}><BookMarkActive style={{ widht: '100px', height: '100px' }} /></div><BurgerMenu className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} /></div> : <div className={icons}><div className="mark" style={{ backgroundColor: 'transparent' }}><BookMarkActive style={{ widht: '100px', height: '100px' }} /></div> <BurgerMenuWhite className={icon} style={{ position: 'absolute', width: '40px', height: '40px' }} /></div>}</NavLink></li>
            </ul>
        </div >

    )
}

export default Menu
