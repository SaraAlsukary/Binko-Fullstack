import style from './ChaperMenu.module.css';
import More from '@assets/svgs/moreGreen.svg?react';
import LoveNotFill from '@assets/svgs/loveNotFill.svg?react';
import LoveFillWhite from '@assets/svgs/loveFillWhite.svg?react';
import BookMark from '@assets/svgs/bookMarkGreen.svg?react';
import BookMarkWhite from '@assets/svgs/bookMarkWhite.svg?react';
import { useAppSelector } from '@hooks/app';

import { useNavigate, useParams } from 'react-router-dom';
const { up, text, bookUp, book, listMenu, icon, activeIcon, active, icons, chapterList, photo, title, author, arrow } = style;

const ChapterMenu = () => {
    const navigate = useNavigate();
    const param: any = useParams();
    const { chapters, books } = useAppSelector(state => state);
    const bookInfo = books.books.find(book => book.id == param.id);
    const chapterIndex = parseInt(param.idChapter);
    const chaptersList = chapters.chapters.map((chapter, idx) => <li className={chapter.id === chapterIndex ? `${active}` : ""} key={chapter.id} onClick={() => navigate(`/Binko/books/${param.id}/${chapter.id}`)}>{chapter.title}</li>)
    const activeHandler = () => {
        var el = document.getElementById('list');
        el?.classList.toggle(active);
    }
    const { language } = useAppSelector(state => state.language);

    const activesHandler = (e: any) => {
        (e.target as Element).classList.toggle(active);
    }
    return (
        <>
            <div className={up}>
                <div className={bookUp}>
                    <div className={book}>
                        <div onClick={() => navigate(`/Binko/books/${bookInfo?.id}`)} className={photo}>
                            <img src={bookInfo?.img} alt="" />
                        </div>
                        <div onClick={() => navigate(`/Binko/books/${bookInfo?.id}`)} className={text}>
                            <div className={title}>
                                {bookInfo?.title}
                            </div>
                            <div className={author}>
                                {language === 'English' ? `Written By ` : `كُتِب بواسطة `} <span>{bookInfo?.Author}</span>
                            </div>
                        </div>
                        <div onClick={() => activeHandler()} className={arrow}>
                            <More style={{ width: '30px' }} />
                        </div>
                    </div>
                    <div className={listMenu}>
                        <ul>
                            <li onClick={(e) => activesHandler(e)}><p>{language === 'English' ? `Save` : `حفظ`} </p><div className={icons}>
                                <div className={activeIcon}><BookMarkWhite style={{ width: '20px' }} /> </div><div className={icon}><BookMark style={{ width: '20px' }} /></div></div></li>
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
