import { useAppDispatch, useAppSelector } from "@hooks/app";
import { useNavigate, useParams } from "react-router-dom";
import style from './BooksInfo.module.css';
import { Container } from "react-bootstrap";
import HeadingTitle from "@components/feedback/HeadingTitle/HeadingTitle";
import { Button, Input } from "@components/feedback";
import Send from '@assets/svgs/send.svg?react';
import SendArabic from '@assets/svgs/sendArabic.svg?react';
import LoveNotFill from '@assets/svgs/loveNotFill.svg?react';
import LoveFillWhite from '@assets/svgs/loveFillWhite.svg?react';
import BookMark from '@assets/svgs/bookMarkGreen.svg?react';
import BookMarkWhite from '@assets/svgs/bookMarkWhite.svg?react';
import Read from '@assets/svgs/read.svg?react';
import { useEffect, useState } from "react";
import actGetCommentByBook from "@store/commentsSlice/act/actGetCommentByBook";
import actGetChapters from "@store/chaptersSlice/act/actGetChapters";
import actGetUsers from "@store/usersSlice/act/actGetUsers";
import actGetCategories from "@store/categorySlice/act/actGetCategories";
import actAddFavorite from "@store/Favorite/act/actAddFavorite";
import actGetfavorite from "@store/Favorite/act/actGetfavorite";
import { actClearComments, changeReplyCount } from "@store/commentsSlice/commentsSlice";
import { actClearUsers } from "@store/usersSlice/userSlice";
import { actClearFavoriteBook } from "@store/Favorite/favoriteSlice";
import { actClearCategories } from "@store/categorySlice/categorySlice";
import { actClearChapters } from "@store/chaptersSlice/chaptersSlice";
import actAddComments from "@store/commentsSlice/act/actAddComment";
import actDeleteBook from "@store/booksSlice/act/actDeleteBooks";
import actDeleteComment from "@store/commentsSlice/act/actDeleteComment";
import actDeleteFavorite from "@store/Favorite/act/actDeleteFavorite";
import actAcceptChapters from "@store/chaptersSlice/act/actAcceptChapter";
import actAddReply from "@store/repliesSlice/act/actAddReply";
import actGetAcceptedChapters from "@store/chaptersSlice/act/actGetAcceptedChapter";
import actAcceptBooks from "@store/booksSlice/act/actAcceptBook";
import { actClearAcceptedBooks, actClearBook, actClearLike, actClearMyBook } from "@store/booksSlice/booksSlice";
import actGetBooksToAccept from "@store/booksSlice/act/actGetBooksToAccept";
import actDeleteChapters from "@store/chaptersSlice/act/actDeleteChapter";
import actGetMyBooks from "@store/booksSlice/act/actGetMyBooks";
import actGetLikes from "@store/booksSlice/act/actGetLikes";
import actAddLikes from "@store/booksSlice/act/actAddLike";
import actDeleteLikes from "@store/booksSlice/act/actDeleteLike";
import toast from "react-hot-toast";
import actGetLikeStatue from "@store/booksSlice/act/actGetLikeStatue";
import { TCategory } from "@customtypes/categoryType";
import actGetAcceptedBooksBySuperCate from "@store/booksSlice/act/actGetAcceptedBooksBySuperCate";
import { confirmDialog } from "primereact/confirmdialog";
import RatingStars from "@components/common/RatingStars/RatingStars";
const { left, pic, author, boxCont, photo, commentBtns, reply, commentsList, authInfo, icons, commenter, commenterName,
  text, bookCont, nameAuth, buttn, icon, activeIcon, inputField, ratings, right, list, up, down, active, cate, loves, input, desc, comments, box } = style;
const BooksInfo = () => {
 
  const [commentText, setCommentText] = useState('');
  const [replyy, setReplyy] = useState('');
  const [likesCount, setLikeCount] = useState(0);
  const [likesStatue, setLikeStatue] = useState(false);
  const [commentId, setCommentId] = useState(0);
  const { language } = useAppSelector(state => state.language)
  const { replies } = useAppSelector(state => state.replies)
  const { users } = useAppSelector(state => state.users)
  const booksFav = useAppSelector(state => state.favorite.books)
  const { categories } = useAppSelector(state => state.categories)
  const { userData } = useAppSelector(state => state.auth)
  const commentss = useAppSelector(state => state.comments.comments);
  const { id }: any = useParams();
  const indx = parseInt(id)
  const { chapters, acceptedchapters } = useAppSelector(state => state.chapters);
  const { books, myBooks, acceptedBooks, likes, is_liked } = useAppSelector(state => state.books);
  const navigate = useNavigate();
  const favoriteData = {
    user: userData?.user?.id,
    book: indx
  }
  const SavedExist = booksFav.find((book) => book.id === indx) ? true : false;
  const AcceptedBook = acceptedBooks.find((book) => book.id === indx) ? true : false;
  const ExistedBook = myBooks.find((book) => (book.id === indx)) ? true : false;
  const chaptersOfBook = (userData?.user.is_supervisor || userData?.user.is_admin || ExistedBook) ? acceptedchapters.filter((ch) => ch.book === indx) : chapters;
  const bookInfo = (userData?.user.is_supervisor || userData?.user.is_admin) ? AcceptedBook ?
    acceptedBooks.find(book => book.id === indx) : books.find((book) => book.id === indx) : ExistedBook ? myBooks.find(book => book.id === indx)
    : SavedExist ? booksFav.find((book) => book.id === indx) : books.find(book => book.id === indx);
  const activeHandler = async (e: any) => {
    (e.target as Element).classList.toggle(active);
    if ((e.target as Element).classList.contains(active) && is_liked) {
      dispatch(actAddLikes(indx));
    } else {
      dispatch(actDeleteLikes(indx))

    }
  }

  const activeFavHandler = (e: any) => {
    (e.target as Element).classList.toggle(active);
    if ((e.target as Element).classList.contains(active) && !SavedExist) {
      dispatch(actAddFavorite(favoriteData))

    } else {
      dispatch(actDeleteFavorite(favoriteData.book))
    }
  }

  const activeMoreHandler = () => {
    var el = document.getElementById('com');
    el?.classList.add(active);
  }
  const activeReplyHandler = (commentId: number,) => {
    navigate(`comments/${commentId}/replies`)

  }
    console.log(bookInfo)

  const editHandler = () => {
    navigate(`edit`);
  }
  const deleteChapterConfirm = (id: number) => {
    confirmDialog({
      message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف الفصل' : 'Are you sure you want to delete this chapter?',
      header: language === 'English' ? 'Confirmation' : "التأكيد",
      icon: 'pi pi-trash',
      acceptLabel: language === 'English' ? 'Yes' : "نعم",
      rejectLabel: language === 'English' ? 'No' : " لا",
      accept: () => {
        deleteChapterHandler(id)
      },
    });
  }
  const deleteBookConfirm = () => {
    confirmDialog({
      message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف الكتاب؟' : 'Are you sure you want to delete this book?',
      header: language === 'English' ? 'Confirmation' : "التأكيد",
      icon: 'pi pi-trash',
      acceptLabel: language === 'English' ? 'Yes' : "نعم",
      rejectLabel: language === 'English' ? 'No' : " لا",
      accept: () => {
        deleteBook(bookInfo?.id!)
      },
    });
  }

  const deleteBook = (userId: number) => {
    dispatch(actDeleteBook(userId)).unwrap().then(() => {
      language === 'English' ? toast.success(' Deleted successfully! ') : toast.success('تم الحذف بنجاح !')
      navigate(-1)
    })
  }
  const deleteChapterHandler = (id: number) => {
    dispatch(actDeleteChapters(id)).unwrap().then(() => {
      language === 'English' ? toast.success('Deleted successfully!') : toast.success('تم الحذف بنجاح!')

    })
  }
  const AcceptChapterHandler = (id: number) => {
    dispatch(actAcceptChapters(id)).unwrap().then(() => {
      language === 'English' ? toast.success('Accepted successfully!') : toast.success('تم القبول بنجاح!')

      navigate(-1)

    })
  }
  const AcceptBookHandler = (id: number) => {
    dispatch(actAcceptBooks(id)).unwrap().then(() => {
      language === 'English' ? toast.success('Accepted successfully!') : toast.success('تم القبول بنجاح!')

      navigate(-1)

    })
  }
  const unactiveInputHandler = () => {
    document.body.addEventListener('click', (e: any) => {
      if (e.target.className !== null)
        var nameCLass = e.target.className;


      var inp = document.getElementById(`inp-${nameCLass}`);
      var span = document.getElementById(`span-${nameCLass}`);
      var inpActive = document.querySelector(`.${inputField}.${active}`);
      var spanActive = document.querySelector(`span.${active}`);

      if (span?.contains(e.target) || inpActive?.contains(e.target)) {
        inp?.classList.add(active);
        span?.classList.add(active);
      } else if (!spanActive?.contains(e.target)) {
        inpActive?.classList.remove(active);
        spanActive?.classList.remove(active);

      }
    })
  }
  const deleteCommentHandler = (id: number) => {
    dispatch(actDeleteComment(id)).unwrap().then(() => {
      language === 'English' ? toast.success('Deleted successfully!') : toast.success('تم الحذف بنجاح!')
    })
  }

  const commentData = {
    comment: commentText

  }
  const addCommentHandler = () => {
    const dataCom = {
      id: bookInfo?.id,
      commentData
    }
    dispatch(actAddComments(dataCom));
    setCommentText('');
  }
  const ReplyData = {
    user: userData?.user?.id,
    comment: commentId,
    content: replyy

  }
  const addReplyHandler = (id:number) => {

    dispatch(actAddReply(ReplyData))
    dispatch(changeReplyCount(id))
    language === 'English' ? toast.success(' Added successfully! ') : toast.success('تم الاضافة بنجاح !')
    setReplyy('');
  }
  const dispatch = useAppDispatch();
  const likeForm = {
    id_book: indx,
    id_user: userData?.user.id!,
  }
  useEffect(
    () => {
      const promiseComment = dispatch(actGetCommentByBook(indx));
      const promiseChapters = dispatch(actGetChapters(indx))
      const promiseLike = dispatch(actGetLikeStatue(likeForm))
      const promiseLikes = dispatch(actGetLikes(indx))
      const promiseUsers = dispatch(actGetUsers())
      const promiseMybooks = dispatch(actGetMyBooks(userData?.user.id!))
      const promiseAcceptedChapter = dispatch(actGetAcceptedChapters())
      const promiseAcceptedBooks = userData?.user.is_supervisor ? dispatch(actGetAcceptedBooksBySuperCate(userData?.user?.id!)) : dispatch(actGetBooksToAccept())
      const promiseCategories = dispatch(actGetCategories())
      const promiseFavorite = dispatch(actGetfavorite(userData?.user.id!))

      return () => {
        promiseLikes.abort();
        promiseLike.abort();
        promiseAcceptedChapter.abort();
        promiseAcceptedBooks.abort();
        promiseComment.abort();
        promiseChapters.abort();
        promiseMybooks.abort();
        promiseUsers.abort();
        promiseCategories.abort();
        promiseFavorite.abort();
        dispatch(actClearLike());
        dispatch(actClearComments());
        dispatch(actClearBook());
        dispatch(actClearAcceptedBooks());
        dispatch(actClearMyBook());
        dispatch(actClearCategories());
        dispatch(actClearUsers());
        dispatch(actClearFavoriteBook());
        dispatch(actClearChapters());
      }
    }, [language]
  )

  unactiveInputHandler();

  var catesss: TCategory[] = [];
  bookInfo?.categories?.forEach(ca => {
    categories.forEach(caa => {
      if (caa.name === ca)
        catesss.push(caa)
    })

  })
  useEffect(() => {
    if (likes) {
      setLikeCount(likes.likes_count)
    }
  }, [likes])
  useEffect(() => {
    if (is_liked) {
      setLikeStatue(is_liked?.is_liked)
    }
  }, [is_liked, likes])

  const categoriesBookCard = catesss.map((cate) => <p onClick={() => navigate(`/Binko/categories/books/${cate?.id}`)} key={Math.random() * 2}>
    {language === 'English' ? cate?.name : cate?.name_arabic}
  </p>
  )
  const commentsListElements = commentss.map(comment => {
    // const replyData = replies.filter(rep => rep.name === comment.user.name);
    return (
      <div key={comment?.id} className={boxCont}>
        <div className={box}>
          <div className={commenter}>
            <div onClick={() => navigate(`/Binko/userInfo/${comment?.user}`)} className={pic}>
              <img src={`http://127.0.0.1:8000/${comment.user_image}`} alt="" />
            </div>
            <div onClick={() => navigate(`/Binko/userInfo/${comment?.user}`)} className={commenterName}>
              {comment?.user_name}
            </div>
          </div>
          <div className={text}>
            <p>{comment?.comment} <span
              className={`${comment?.id}`}
              id={`span-${comment?.id}`}
            >{language === 'English' ? `REPLY` : `الرد`}</span></p>
          </div>
          {

            (comment.user_name === userData?.user.name || userData?.user.is_admin || userData?.user.is_supervisor) ?
              <div className={commentBtns}>

                <Button
                  onClick={() => deleteCommentHandler(comment?.id!)}
                  style={{ width: '60px', margin: "10px", backgroundColor: "#f35151" }}>{language === 'English' ? 'Delete' : 'حذف'}</Button>
              </div> : ""
          }
          <div
            className={` ${inputField}`}
            id={`inp-${comment?.id}`} >
            <div className={input}>
              <Input onChange={(e) => {
                setCommentId(comment?.id!)
                setReplyy(e.target.value)
              }} type="text" placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
            </div>
            <div className={icon} onClick={()=>addReplyHandler(comment?.id)}>
              {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
            </div>
          </div>
        </div>

        {

          comment.reply_count > 0 ? <div onClick={() => activeReplyHandler(comment.id)} id={`${reply}-${comment.id}`} className={reply}>
            {language === 'English' ? `There are ${comment.reply_count} replies` : `   هناك ${replies.length} رد`}
          </div> : ''
        }

      </div >)
  });
  const chaptersLists = chapters?.map((chapter, idx) => <li key={chapter.id} style={{ position: 'relative' }}><span onClick={() => navigate(`${chapter.id}`)}>{chapter.title}</span> <span
    style={language === 'Arabic' ? { position: 'absolute', right: '78%', top: '31%', display: 'flex' } : { position: 'absolute', right: '10px' }}
  >

    <Button
      style={{ backgroundColor: '#f35151', margin: '0 1px' }
      }
      onClick={() => deleteChapterConfirm(chapter.id)}


    >
      {language === 'Arabic' ? 'حذف' : 'Delete'
      }      </Button>
  </span></li>);
  const chaptersList = chaptersOfBook?.map((chapter, idx) => <li key={chapter.id}

    style={{ position: 'relative' }}
  >
    <span
      onClick={() => navigate(`${chapter.id}`)}
    >
      {chapter.title}
    </span>
    {(userData?.user.is_supervisor || userData?.user.is_admin) ?
      <span
        style={language === 'Arabic' ? { position: 'absolute', right: '67%', top: '31%', display: 'flex' } : { position: 'absolute', right: '10px' }}
      >
        {!chapter.is_accept ? <Button style={{ backgroundColor: 'var(--secondary-color)', margin: '0 1px' }}
          onClick={() => AcceptChapterHandler(chapter.id)}
        >
          {language === 'Arabic' ? 'قبول' : 'Accept'}
        </Button> : ""
        }
        <Button
          style={{ backgroundColor: '#f35151', margin: '0 1px' }
          }
          onClick={() => navigate(`chapter/${chapter.id}/note`)

          }


        >
          {language === 'Arabic' ? 'رفض' : 'Deny'
          }      </Button>
      </span>
      : ExistedBook ? <span
        style={language === 'Arabic' ? { position: 'absolute', right: '90%', top: '31%', display: 'flex' } : { position: 'absolute', right: '10px' }}
      >
        {/* <Button style={{ backgroundColor: 'var(--secondary-color)', margin: '0 1px' }}
        // onClick={() => AcceptChapterHandler(chapter.id)}
        >
          {language === 'Arabic' ? 'تعديل' : 'Edit'}
        </Button> */}
        <Button
          style={{ backgroundColor: '#f35151', margin: '0 1px' }
          }
          onClick={() => deleteChapterConfirm(chapter.id)}


        >
          {language === 'Arabic' ? 'حذف' : 'Delete'
          }      </Button>
      </span>
        : ''}
  </li >)
  const userProfile = users.find(user=>user.id===bookInfo?.user?.id)
  return (
    <Container className={bookCont} >
      <div className={left}>
        <div className={pic}>
          <img src={`http://127.0.0.1:8000${bookInfo?.image}`} alt="" crossOrigin="anonymous" />
        </div>
        <div className={author} onClick={() => navigate(`/Binko/userInfo/${bookInfo?.user?.id}/`)}>
          <h3>{language === 'English' ? `About The Author` : `عن الكاتب`}</h3>
          <div className={authInfo}>
            <div className={photo}>
              <img src={`http://127.0.0.1:8000${userProfile?.image}`} alt="" />
            </div>
            <div className={nameAuth}>{bookInfo?.user?.name}</div>
          </div>
        </div>
      </div>
      <div className={right}>
        <div className={up}>
          <h1>{bookInfo?.name}</h1>
          <span>{bookInfo?.user?.name}</span>
          <div className={cate}>
            {categoriesBookCard}
          </div>
          <p className={loves}>{language === 'English' ? `${likesCount} Likes` : ` ${likesCount} اعجاب `} </p>
          <p >{language === 'English' ? ` Book Ratings` : ` تقييم الكتاب`} : <span className={ratings}>{bookInfo?.average_rating/2}/5 </span></p>
          <p>{language === 'English' ? `Publication Date` : ` تاريخ النشر `} : {bookInfo?.publication_date} </p>
          <p className={desc}>{bookInfo?.description}</p>
       { (userData?.user.id!==bookInfo?.user?.id)?  <RatingStars bookId={bookInfo?.id!} userId={userData?.user.id!} />:""}
          <ul>
            {ExistedBook ? '' :
              <li className={SavedExist ? active : ''} onClick={(e) => activeFavHandler(e)}><p>{language === 'English' ? `Save` : `حفظ`} </p>
                <div className={icons}>
                  <div className={activeIcon}>
                    <BookMarkWhite style={{ width: '20px' }} />
                  </div>
                  <div className={icon}>
                    <BookMark style={{ width: '20px' }} />
                  </div>
                </div>
              </li>
            }
            <li className={likesStatue ? active : ''} onClick={(e) => activeHandler(e)}><p>{language === 'English' ? `Like` : `أعجبني`}</p><div className={icons}>
              <div className={activeIcon}><LoveFillWhite style={{ width: '20px' }} /> </div><div className={icon}><LoveNotFill style={{ width: '20px' }} /></div></div></li>
            <li className={active} onClick={() => navigate(`${chapters[0].id}`)} ><p>{language === 'English' ? `Read` : `قراءة`}</p> <div className={icon}><Read style={{ width: '20px' }} /></div></li>
          </ul>
          {ExistedBook && !userData?.user.is_supervisor && !userData?.user.is_admin ?
            <div style={{
              display: 'flex', justifyContent: "center",
              alignItems: "center"
            }}>
              <Button
                onClick={editHandler}
                style={{ margin: '10px', width: '50%' }}>{language === 'English' ? 'Edit' : "تعديل"}</Button>
              <Button onClick={deleteBookConfirm} style={{ margin: '10px', backgroundColor: '#f35151', width: '50%' }}>{language === 'English' ? 'Delete' : "حذف"}</Button>
            </div>
            : ''}
          {(userData?.user.is_supervisor || userData?.user.is_admin) ?
            <div style={{
              display: 'flex', justifyContent: "center",
              alignItems: "center"
            }}>
              {!bookInfo?.is_accept ? <Button onClick={() => AcceptBookHandler(indx)} style={{ width: '40%' }}>{language === 'Arabic' ? 'قبول' :
                'Accept'}</Button> : ""}
              <Button onClick={() => navigate(`note`)
              } style={{ margin: '0 5px ', backgroundColor: '#f35151', width: '40%' }}>{language === 'English' ? 'Deny' : "رفض"}</Button>

            </div>
            : ""}
        </div>

        <div className={down}>
          <HeadingTitle>{language === 'English' ? `Content` : `المحتوى`}</HeadingTitle>
          <div className="content">
            {bookInfo?.content}
          </div>
          <HeadingTitle>{language === 'English' ? `Chapters` : `الفصول`}</HeadingTitle>
          {ExistedBook ? <Button onClick={() =>
            navigate(`/Binko/books/${bookInfo?.id}/addChapter`)
          } style={{ width: '50%' }}>{language === 'English' ? 'Add Chapter' : "اضافة فصل"}</Button> : ''}
          <ul className={list}>
            {(chaptersList.length || chaptersLists.length) || (chaptersList.length && (!userData?.user.is_admin || !userData.user.is_supervisor)) ? chaptersList :
              language === 'English' ? 'There is no chapters yet' : 'لا يوجد فصول بعد'}
            {(userData?.user.is_admin || userData?.user.is_supervisor || ExistedBook) ? chaptersLists : ""}
          </ul>

          <div className={comments}>

            <HeadingTitle>{language === 'English' ? `Comments` : `التعليقات`}</HeadingTitle>
            <div className={inputField}>
              <div className={input}>
                <Input value={commentText} type="text" onChange={(e: any) => setCommentText(e.target.value)} placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
              </div>
              <div className={icon} onClick={addCommentHandler}>
                {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
              </div>
            </div>
            <div id="com" className={commentsList}>
              {commentsListElements.length ? commentsListElements :
                language === 'English' ? 'There is no comments' : 'لا يوجد تعليقات'}
              {commentsListElements.length > 3 ? <div onClick={() => { activeMoreHandler() }} className={buttn}>
                <Button>{language === 'English' ? `More` : `المزيد`}</Button>
              </div> : ""}
            </div>

          </div>
        </div>
      </div>

    </Container >
  )
}

export default BooksInfo
