import style from './ChaperMenu.module.css';
import More from '@assets/svgs/moreGreen.svg?react';
import LoveNotFill from '@assets/svgs/loveNotFill.svg?react';
import LoveFillWhite from '@assets/svgs/loveFillWhite.svg?react';
import BookMark from '@assets/svgs/bookMarkGreen.svg?react';
import BookMarkWhite from '@assets/svgs/bookMarkWhite.svg?react';
import { useAppDispatch, useAppSelector } from '@hooks/app';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import actGetBooksToAccept from '@store/booksSlice/act/actGetBooksToAccept';
const { up, text, bookUp, book, listMenu, icon, activeIcon, active, icons, chapterList, photo, title, author, arrow } = style;

const ChapterMenu = () => {
    const navigate = useNavigate();
    const param: any = useParams();
    const { chapters, books, favorite } = useAppSelector(state => state);
    const { userData } = useAppSelector(state => state.auth);
    const { acceptedBooks } = useAppSelector(state => state.books);
    const MybookInfo = books.myBooks.find(book => book.id == param.id);
    const MybookFav = favorite.books.find(book => book.id == param.id) ? true : false;
    const bookInfo = (MybookInfo) ? books.myBooks.find(book => book.id == param.id) : (userData?.user.is_supervisor || userData?.user.is_admin) ? acceptedBooks.find(book => book.id == param.id) : books.books.find(book => book.id == param.id);
    const chaptersInfo = MybookInfo ? chapters.acceptedchapters.filter((ch) => ch.book == param.id) : chapters.chapters.filter((ch) => ch.book == param.id);
    const chapterIndex = parseInt(param.idChapter);
    const chaptersList = chaptersInfo.map((chapter, idx) => <li className={chapter.id === chapterIndex ? `${active}` : ""} key={chapter.id} onClick={() => navigate(`/Binko/books/${param.id}/${chapter.id}`)}>{chapter.title}</li>)
    const activeHandler = () => {
        var el = document.getElementById('list');
        el?.classList.toggle(active);
    }
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    const activesHandler = (e: any) => {
        (e.target as Element).classList.toggle(active);
    }
    useEffect(() => {
        dispatch(actGetfavorite(userData?.user.id))
        dispatch(actGetBooksToAccept())
    }, [])
    return (
        <>
            <div className={up}>
                <div className={bookUp}>
                    <div className={book}>
                        <div onClick={() => navigate(`/Binko/books/${bookInfo?.id}`)} className={photo}>
                            <img src={`http://127.0.0.1:8000${bookInfo?.image}`} alt="" />
                        </div>
                        <div onClick={() => navigate(`/Binko/books/${bookInfo?.id}`)} className={text}>
                            <div className={title}>
                                {bookInfo?.name}
                            </div>
                            <div className={author}>
                                {language === 'English' ? `Written By ` : `كُتِب بواسطة `} <span>{bookInfo?.user.name}</span>
                            </div>
                        </div>
                        <div onClick={() => activeHandler()} className={arrow}>
                            <More style={{ width: '30px' }} />
                        </div>
                    </div>
                    <div className={listMenu}>
                        <ul>
                            {!MybookInfo ? <li className={MybookFav ? active : ''} onClick={(e) => activesHandler(e)}>
                                <p>{language === 'English' ? `Save` : `حفظ`} </p><div className={icons}>
                                    <div className={icon}>
                                        <BookMark style={{ width: '20px' }} />
                                    </div>
                                    <div className={activeIcon}>
                                        <BookMarkWhite style={{ width: '20px' }} /> </div>
                                </div>
                            </li> : ''}
                            <li onClick={(e) => activesHandler(e)}><p>{language === 'English' ? `Like` : `أعجبني`}</p><div className={icons}>
                                <div className={activeIcon}><LoveFillWhite style={{ width: '20px' }} /> </div><div className={icon}><LoveNotFill style={{ width: '20px' }} /></div></div></li>
                        </ul></div>
                </div>


            </div>
            <ul className={chapterList} id='list'>
                {chaptersList}
            </ul>
        </>
    )
}

export default ChapterMenu
