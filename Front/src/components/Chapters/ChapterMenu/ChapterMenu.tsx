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
import { useEffect, useState, useRef, useCallback } from 'react';
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
import actShowBook from '@store/booksSlice/act/actShowBook';
import { Localhost } from '@utils/localhost';
import toast from 'react-hot-toast';
import { confirmDialog } from 'primereact/confirmdialog';
import { addCheckpoint } from '@store/checkpoint/checkpoint';

const { chaperMenu, scroll, scrollBar, up, text, bookUp, book, listMenu, icon, activeIcon, active, icons, chapterList, photo, title, arrow } = style;

type TDisForm = {
    book_id: number,
    user_id: number
}

interface ICheckpoint {
    book: number,
    chapter: number,
    checkpoint: number
}

const ChapterMenu = () => {
    const navigate = useNavigate();
    const param: any = useParams();
    const [checkpoint, setCheckpoint] = useState<number>(0);
    const [likesStatue, setLikeStatue] = useState(false);
    const [is_dislike, setDislikeStatue] = useState(false);

    const { chapters, books, favorite } = useAppSelector(state => state);
    const { userData } = useAppSelector(state => state.auth);
    const { acceptedBooks, is_disliked, is_liked, likes, dislikes } = useAppSelector(state => state.books);

    const MybookInfo = books.myBooks.find(book => book.id == param.id);
    const MybookFav = favorite.books.find(book => book.id == param.id) ? true : false;
    const bookInfo = (MybookInfo) ? books.myBooks.find(book => book.id == param.id) : (userData?.user.is_supervisor || userData?.user.is_admin) ? acceptedBooks.find(book => book.id == param.id) : books.books.find(book => book.id == param.id);

    const chapterIndex = parseInt(param.idChapter);
    const chaptersList = chapters.chapters.map((chapter) =>
        <li className={chapter.id === chapterIndex ? `${active}` : ""} key={chapter.id} onClick={() => navigate(`/Binko/books/${param.id}/${chapter.id}`)}>
            {chapter.title}
        </li>
    );

    const disForm: TDisForm = {
        user_id: userData?.user.id!,
        book_id: bookInfo?.id!
    };

    const likeForm = {
        id_book: param.id,
        id_user: userData?.user.id!,
    }

    const favoriteData = {
        user: userData?.user?.id!,
        book: param.id
    }

    const activeHandler = () => {
        const el = document.getElementById('list');
        (el as Element).classList.toggle(active);
    }

    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);

    // Use ref to prevent infinite updates
    const checkpointRef = useRef<number>(0);
    const saveTimeoutRef = useRef<NodeJS.Timeout>();

    const activeFavHandler = (e: any) => {
        if (userData?.user) {
            (e.target as Element).classList.toggle(active);
            if ((e.target as Element).classList.contains(active) && !MybookFav) {
                dispatch(actAddFavorite(favoriteData))
            } else {
                dispatch(actDeleteFavorite(favoriteData.book))
            }
        } else {
            toast.error(language === 'English' ? 'You must be logged in to use this feature' : 'يجب تسجيل الدخول لاستخدام هذه الميزة');
            confirm()
        }
    }

    const confirm = () => {
        confirmDialog({
            message: language === 'English' ? "You Should Login First!" : "يجب عليك تسجيل الدخول أولاً",
            header: language === 'English' ? 'Login Confirmation' : "تأكيد تسجبل الدخول",
            icon: 'pi pi-info-circle',
            position: "top",
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => {
                navigate('/Binko/Login')
            },
        });
    };

    const activeLikeHandler = async (e: any) => {
        if (userData?.user) {
            (e.target as Element).classList.toggle(active);
            if ((e.target as Element).classList.contains(active) && is_liked) {
                dispatch(actAddLikes(param.id));
                if (dislikes?.dislike_count) {
                    dispatch(actRemoveDislike(disForm));
                }
            } else {
                dispatch(actDeleteLikes(param.id))
            }
        } else {
            toast.error(language === 'English' ? 'You must be logged in to use this feature' : 'يجب تسجيل الدخول لاستخدام هذه الميزة');
            confirm()
        }
    }

    const activeDisHandler = async (e: any) => {
        if (userData?.user) {
            const btnlike = document.querySelectorAll(".btnlike");
            btnlike.forEach(btn => {
                (btn as Element).classList.remove(active)
            });
            (e.target as Element).classList.toggle(active);

            if ((e.target as Element).classList.contains(active) && is_dislike) {
                dispatch(actRemoveDislike(disForm));
            } else {
                dispatch(actAddDislike(disForm));
            }
        } else {
            toast.error(language === 'English' ? 'You must be logged in to use this feature' : 'يجب تسجيل الدخول لاستخدام هذه الميزة');
            confirm()
        }
    }

    // Debounced checkpoint saving
    const saveCheckpoint = useCallback((percentage: number) => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        saveTimeoutRef.current = setTimeout(() => {
            const checkpointForm: ICheckpoint = {
                book: parseInt(param.id),
                chapter: chapterIndex,
                checkpoint: Math.round(percentage) // Save as percentage
            };

            dispatch(addCheckpoint(checkpointForm));
        }, 500); // Save after 500ms of no scrolling
    }, [dispatch, param.id, chapterIndex]);

    useEffect(() => {
        let promise1: any;
        let promise2: any;
        let promise3: any;
        let promise4: any;
        let promise5: any;
        let promise6: any;

        // Always dispatch these actions
        promise3 = dispatch(actGetBooks());
        promise4 = dispatch(actShowBook(param.id));

        // Only dispatch user-specific actions if userData exists
        if (userData) {
            promise1 = dispatch(actGetfavorite(userData.user.id!));
            promise2 = dispatch(actGetBooksToAccept());
            promise5 = dispatch(actGetLikeStatue(likeForm));
            promise6 = dispatch(actGetDislikeStatue(likeForm));
        }

        return () => {
            promise1?.abort();
            promise2?.abort();
            promise3?.abort();
            promise4?.abort();
            promise5?.abort();
            promise6?.abort();
        }
    }, [dispatch, param.id]); // Remove userData from dependencies

    useEffect(() => {
        if (is_liked) {
            setLikeStatue(is_liked.is_liked);
        }
    }, [is_liked, likes]);

    useEffect(() => {
        if (is_disliked) {
            setDislikeStatue(is_disliked.dis_liked);
        }
    }, [is_disliked, dislikes]);

    useEffect(() => {
        dispatch(actGetDisLikes(param.id));
    }, [dispatch, param.id, is_disliked, is_liked]);

    useEffect(() => {
        dispatch(actGetLikes(param.id));
    }, [dispatch, param.id, is_liked, is_disliked]);

    useEffect(() => {
        const scrollBarHandler = () => {
            const scrollElement = document.querySelector(`.${scrollBar}`);
            const totalHeight = document.body.scrollHeight - window.innerHeight;

            if (totalHeight > 0) {
                const scrollY = window.scrollY;
                const percentage = (scrollY / totalHeight) * 100;
                const scrollValue = `${percentage}%`;

                if (scrollElement) {
                    (scrollElement as HTMLElement).style.width = scrollValue;
                }

                // Only update if percentage changed significantly (1% threshold)
                if (Math.abs(percentage - checkpointRef.current) >= 1) {
                    setCheckpoint(percentage);
                    checkpointRef.current = percentage;
                    saveCheckpoint(percentage);
                }
            }
        };

        const scrollHandler = () => {
            const menu = document.querySelector(`.${chaperMenu}`);
            if (window.scrollY > 50) {
                (menu as Element).classList.add(scroll);
            } else {
                (menu as Element).classList.remove(scroll);
            }
        };

        window.addEventListener('scroll', scrollHandler);
        window.addEventListener('scroll', scrollBarHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
            window.removeEventListener('scroll', scrollBarHandler);
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [saveCheckpoint]);

    return (
        <div className={chaperMenu}>
            <div className={up}>
                <div className={bookUp}>
                    <div className={book}>
                        <div onClick={() => navigate(`/Binko/books/${books?.book!.id}`)} className={photo}>
                            <img src={`${Localhost}${books.book?.image}`} alt="" />
                        </div>
                        <div onClick={() => navigate(`/Binko/books/${bookInfo?.id}`)} className={text}>
                            <div className={title}>
                                {books.book?.name}
                            </div>
                        </div>
                        <div onClick={() => activeHandler()} className={arrow}>
                            <More style={{ width: '30px' }} />
                        </div>
                    </div>
                    <div className={listMenu}>
                        <ul>
                            {!MybookInfo ? <li className={MybookFav ? active : ''} onClick={(e) => activeFavHandler(e)}>
                                <p>{language === 'English' ? `Save` : `حفظ`} </p>
                                <div className={icons}>
                                    <div className={icon}>
                                        <BookMark style={{ width: '20px' }} />
                                    </div>
                                    <div className={activeIcon}>
                                        <BookMarkWhite style={{ width: '20px' }} />
                                    </div>
                                </div>
                            </li> : ''}
                            <li className={likesStatue ? `btnlike ${active}` : 'btnlike'} onClick={(e) => activeLikeHandler(e)}>
                                <p>{language === 'English' ? `Like` : `أعجبني`}</p>
                                <div className={icons}>
                                    <div className={activeIcon}>
                                        <LikeWhite style={{ width: '20px' }} />
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
                        </ul>
                    </div>
                </div>
            </div>
            <div className={scrollBar}></div>
            <ul className={`${chapterList}`} id='list' >
                {chaptersList}
            </ul>
        </div>
    )
}

export default ChapterMenu