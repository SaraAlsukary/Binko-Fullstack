import style from './ChaperMenu.module.css';
import More from '@assets/svgs/moreGreen.svg?react';
import Like from '@assets/svgs/like.svg?react';
import LikeWhite from '@assets/svgs/like-white.svg?react';
import Dislike from '@assets/svgs/dislike.svg?react';
import DislikeWhite from '@assets/svgs/dislike-white.svg?react';
import BookMark from '@assets/svgs/bookMarkGreen.svg?react';
import BookMarkWhite from '@assets/svgs/bookMarkWhite.svg?react';
import { useAppDispatch, useAppSelector } from '@hooks/app';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import actGetBooksToAccept from '@store/booksSlice/act/actGetBooksToAccept';
import actGetBooks from '@store/booksSlice/act/actGetBooks';
import actRemoveDislike from '@store/booksSlice/act/actRemoveDislike';
import actDeleteLikes from '@store/booksSlice/act/actDeleteLike';
import actAddLikes from '@store/booksSlice/act/actAddLike';
import actAddDislike from '@store/booksSlice/act/actAddDislike';
import actGetLikeStatue from '@store/booksSlice/act/actGetLikeStatue';
import actGetDislikeStatue from '@store/booksSlice/act/actGetDislikeStatue';
import actAddFavorite from '@store/Favorite/act/actAddFavorite';
import actDeleteFavorite from '@store/Favorite/act/actDeleteFavorite';
import actGetDisLikes from '@store/booksSlice/act/actGetDisLikes ';
import actGetLikes from '@store/booksSlice/act/actGetLikes';
const { up, text, bookUp, book, listMenu, icon, activeIcon, active, icons, chapterList, photo, title, author, arrow } = style;
type TDisForm = {
    book_id: number,
    user_id: number
}
const ChapterMenu = () => {
    const navigate = useNavigate();
    const param: any = useParams();
    const [likesStatue, setLikeStatue] = useState(false);
    const [is_dislike, setDislikeStatue] = useState(false);
    const { chapters, books, favorite } = useAppSelector(state => state);
    const { userData } = useAppSelector(state => state.auth);
    const { acceptedBooks, is_disliked, is_liked, likes, dislikes } = useAppSelector(state => state.books);
    const MybookInfo = books.myBooks.find(book => book.id == param.id);
    const MybookFav = favorite.books.find(book => book.id == param.id) ? true : false;
    const bookInfo = (MybookInfo) ? books.myBooks.find(book => book.id == param.id) : (userData?.user.is_supervisor || userData?.user.is_admin) ? acceptedBooks.find(book => book.id == param.id) : books.books.find(book => book.id == param.id);
    const chaptersInfo = MybookInfo ? chapters.acceptedchapters.filter((ch) => ch.book == param.id) : chapters.chapters.filter((ch) => ch.book == param.id);
    const chapterIndex = parseInt(param.idChapter);
    const chaptersList = chapters.chapters.map((chapter, idx) => <li className={chapter.id === chapterIndex ? `${active}` : ""} key={chapter.id} onClick={() => navigate(`/Binko/books/${param.id}/${chapter.id}`)}>{chapter.title}</li>)
    const disForm: TDisForm = {
        user_id: userData?.user.id!,
        book_id: bookInfo?.id!
    };
    const likeForm = {
        id_book: param.id,
        id_user: userData?.user.id!,
    }
    const favoriteData = {
        user: userData?.user?.id,
        book: param.id
    }
    const activeHandler = () => {
        var el = document.getElementById('list');
        (el as Element).classList.toggle(active);
        console.log(el);
    }
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);

    const activeFavHandler = (e: any) => {
        (e.target as Element).classList.toggle(active);
        if ((e.target as Element).classList.contains(active) && !MybookFav) {
            dispatch(actAddFavorite(favoriteData))

        } else {
            dispatch(actDeleteFavorite(favoriteData.book))
        }
    }
    const activeLikeHandler = async (e: any) => {
        (e.target as Element).classList.toggle(active);
        if ((e.target as Element).classList.contains(active) && is_liked) {
            dispatch(actAddLikes(param.id));
            if (dislikes?.dislike_count) {
                dispatch(actRemoveDislike(disForm));
            }

        } else {
            dispatch(actDeleteLikes(param.id))

        }
    }
    const activeDisHandler = async (e: any) => {
        const btnlike = document.querySelectorAll(".btnlike");
        btnlike.forEach(btn => {
            (btn as Element).classList.remove(active)
        });
        (e.target as Element).classList.toggle(active);
        // console.log(is_disliked)
        if ((e.target as Element).classList.contains(active) && is_dislike) {
            dispatch(actRemoveDislike(disForm));
        } else {
            dispatch(actAddDislike(disForm));
        }
    }

    useEffect(() => {
        dispatch(actGetfavorite(userData?.user!.id!))
        dispatch(actGetBooksToAccept())
        dispatch(actGetBooks())
        dispatch(actGetLikeStatue(likeForm))
        dispatch(actGetDislikeStatue(likeForm))
    }, [])

    useEffect(() => {
        if (is_liked) {
            setLikeStatue(is_liked?.is_liked)
        }
    }, [is_liked, likes])

    useEffect(() => {
        if (is_disliked) {
            setDislikeStatue(is_disliked?.dis_liked)
        }
    }, [is_disliked, dislikes])
    useEffect(() => {
        dispatch(actGetDisLikes(param.id))
    }, [is_disliked, is_liked]);
    useEffect(() => {
        dispatch(actGetLikes(param.id));
    }, [is_liked, is_disliked]);
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
                                {language === 'English' ? `Written By ` : `كُتِب بواسطة `} <span>{bookInfo?.user?.name!}</span>
                            </div>
                        </div>
                        <div onClick={() => activeHandler()} className={arrow}>
                            <More style={{ width: '30px' }} />
                        </div>
                    </div>
                    <div className={listMenu}>
                        <ul>
                            {!MybookInfo ? <li className={MybookFav ? active : ''} onClick={(e) => activeFavHandler(e)}>
                                <p>{language === 'English' ? `Save` : `حفظ`} </p><div className={icons}>
                                    <div className={icon}>
                                        <BookMark style={{ width: '20px' }} />
                                    </div>
                                    <div className={activeIcon}>
                                        <BookMarkWhite style={{ width: '20px' }} /> </div>
                                </div>
                            </li> : ''}
                            <li className={likesStatue ? `btnlike ${active}` : 'btnlike'} onClick={(e) => activeLikeHandler(e)}>
                                <p>{language === 'English' ? `Like` : `أعجبني`}</p>
                                <div className={icons}>
                                    <div className={activeIcon}><LikeWhite style={{ width: '20px' }} />
                                    </div>
                                    <div className={icon}>
                                        <Like style={{ width: '20px' }} />
                                    </div>
                                </div>
                            </li>
                            <li className={is_dislike ? `btnlike ${active}` : 'btnlike'} onClick={(e) => activeDisHandler(e)}>
                                <p>
                                    {language === 'English' ? `Dislike` : `لم يعجبني`}
                                </p>
                                <div className={icons}>
                                    <div className={activeIcon}>
                                        <DislikeWhite style={{ width: '20px' }} />
                                    </div>
                                    <div className={icon}>
                                        <Dislike style={{ width: '20px' }} />
                                    </div>
                                </div>
                            </li>
                        </ul></div>
                </div>


            </div>
            <ul className={`${chapterList}`} id='list' >
                {chaptersList}
            </ul>
        </>
    )
}

export default ChapterMenu
