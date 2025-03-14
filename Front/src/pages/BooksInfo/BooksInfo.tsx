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
import { actClearComments } from "@store/commentsSlice/commentsSlice";
import { actClearUsers } from "@store/usersSlice/userSlice";
import { actClearFavoriteBook } from "@store/Favorite/favoriteSlice";
import { actClearCategories } from "@store/categorySlice/categorySlice";
import { actClearChapters } from "@store/chaptersSlice/chaptersSlice";
import actAddComments from "@store/commentsSlice/act/actAddComment";
import actDeleteBook from "@store/booksSlice/act/actDeleteBooks";
import actDeleteComment from "@store/commentsSlice/act/actDeleteComment";
import actDeleteFavorite from "@store/Favorite/act/actDeleteFavorite";
import actGetReplyByComment from "@store/repliesSlice/act/actGetReplyByComment";
import actDenyChapters from "@store/chaptersSlice/act/actDenyChapter";
import actAcceptChapters from "@store/chaptersSlice/act/actAcceptChapter";
import actAddReply from "@store/repliesSlice/act/actAddReply";
const { left, pic, author, boxCont, photo, commentBtns, reply, replyBox, replyer, replyerName, replyList, commentsList, authInfo, icons, commenter, commenterName,
  text, bookCont, nameAuth, buttn, icon, activeIcon, inputField, descAuth, right, list, up, down, active, cate, loves, input, desc, comments, box } = style;
const BooksInfo = () => {
  const [commentText, setCommentText] = useState('');
  const [replyy, setReplyy] = useState('');
  const [commentId, setCommentId] = useState(0);
  const { language } = useAppSelector(state => state.language)
  const { replies } = useAppSelector(state => state.replies)
  const { users } = useAppSelector(state => state.users)
  const booksFav = useAppSelector(state => state.favorite.books)
  const { categories } = useAppSelector(state => state.categories)
  const { user } = useAppSelector(state => state.auth)
  const commentss = useAppSelector(state => state.comments.comments);
  const { id }: any = useParams();
  const indx = parseInt(id)
  const { chapters } = useAppSelector(state => state.chapters);
  const { books, myBooks } = useAppSelector(state => state.books);
  const navigate = useNavigate();
  const favoriteData = {
    user: user?.id,
    book: indx
  }
  const SavedExist = booksFav.find((book) => book.id === indx) ? true : false;
  const ExistedBook = myBooks.find((book) => book.id === indx) ? true : false;
  const bookInfo = ExistedBook ? myBooks.find(book => book.id === indx) : SavedExist ? booksFav.find((book) => book.id === indx) : books.find(book => book.id === indx);
  const ExistedComment = commentss.find((comment) => comment.user_id === user?.id) ? true : false;
  const activeHandler = (e: any) => {
    (e.target as Element).classList.toggle(active);
    if ((e.target as Element).classList.contains(active)) {


    } else {


    }
  }

  useEffect(() => {
    commentss.forEach(comment => {
      dispatch(actGetReplyByComment(comment.id))
    })
  }, [])


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
  const activeReplyHandler = (e: any) => {
    if (e.target.id !== null)
      var nameId = e.target.id;

    var el = document.querySelector(`.${nameId}`);

    el?.classList.add(active);
    (e.target as Element).classList.add(active);

  }
  const denyHandler = () => {
    dispatch(actDeleteBook(indx)).unwrap().then(() => {
      alert('Deleted successfully!')
      navigate(`/Binko/admin`)
    })
  }
  const deleteHandler = () => {
    dispatch(actDeleteBook(indx)).unwrap().then(() => {
      alert('Deleted successfully!')
      navigate(`/Binko/admin`)
    })
  }
  const denyChapterHandler = (id: number) => {
    dispatch(actDenyChapters(id)).unwrap().then(() => {
      alert('Deleted successfully!')
      navigate(`/Binko/admin`)
    })
  }
  const AcceptChapterHandler = (id: number) => {
    dispatch(actAcceptChapters(id)).unwrap().then(() => {
      alert('Accepted successfully!')
      navigate(`/Binko/admin`)
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
  const deleteCommentHandler = (id) => {
    // dispatch(actDeleteComment(id)).unwrap().then(() => {
    //   alert('deleted successfully');
    // })
  }
  const commentData = {
    user: user?.id,
    book: indx,
    comment: commentText

  }
  const addCommentHandler = () => {
    dispatch(actAddComments(commentData));
    setCommentText('');
  }
  const ReplyData = {
    user: user?.id,
    comment: commentId,
    reply: replyy

  }
  const addReplyHandler = () => {
    dispatch(actAddReply(ReplyData)).unwrap().then(() => {
      alert('hello')
    })
    setReplyy('');
  }
  const dispatch = useAppDispatch();
  useEffect(
    () => {
      const promiseComment = dispatch(actGetCommentByBook(bookInfo?.id));
      const promiseChapters = dispatch(actGetChapters(bookInfo?.id))
      const promiseUsers = dispatch(actGetUsers())
      const promiseCategories = dispatch(actGetCategories())
      const promiseFavorite = dispatch(actGetfavorite(user?.id))
      return () => {
        promiseComment.abort();
        promiseChapters.abort();
        promiseUsers.abort();
        promiseCategories.abort();
        promiseFavorite.abort();
        dispatch(actClearComments());
        dispatch(actClearCategories());
        dispatch(actClearUsers());
        dispatch(actClearFavoriteBook());
        dispatch(actClearChapters());
      }
    }, []
  )
  unactiveInputHandler();

  const categoriesBookExist = books.map((book) => book.category)
  const categoriesBook = categoriesBookExist.map((cate) => {
    const filter = categories.filter((cates) => cates.id === cate)
    if (filter)
      return filter
  })
  const categoriesBookCard = categoriesBook.map((cate) => <p key={Math.random() * 2}>{language === 'English' ? cate?.name : cate?.name_arabic}</p>
  )
  const commentsListElements = commentss.map(comment => {
    return (<div key={comment?.id} className={boxCont}><div className={box}>
      <div className={commenter}>
        <div onClick={() => navigate(`/Binko/userInfo/${comment?.user_id}`)} className={pic}>
          <img src={`http://127.0.0.1:8000${comment.image}`} alt="" />
        </div>
        <div onClick={() => navigate(`/Binko/userInfo/${comment?.user_id}`)} className={commenterName}>
          {comment?.name}
        </div>
      </div>
      <div className={text}>
        <p>{comment?.comment} <span
          className={`${comment?.id}`}
          id={`span-${comment?.id}`}
        >{language === 'English' ? `REPLY` : `الرد`}</span></p>
      </div>
      {ExistedComment || user?.user_type === 'admin' || user?.user_type === 'supervisor' ?
        <div className={commentBtns}>
          {ExistedComment ? <Button style={{ width: '60px', }}>{language === 'English' ? 'Edit' : 'تعديل'}</Button> : ""}
          <Button
            onClick={() => deleteCommentHandler(comment?.id)}
            style={{ width: '60px', margin: "0 10px", backgroundColor: "#f35151" }}>{language === 'English' ? 'Delete' : 'حذف'}</Button>
        </div> : ""
      }
      <div
        className={` ${inputField}`}
        id={`inp-${comment?.id}`} >
        <div className={input}>
          <Input onChange={(e) => {
            setCommentId(comment?.id)
            setReplyy(e.target.value)
          }} type="text" placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
        </div>
        <div className={icon} onClick={addReplyHandler}>
          {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
        </div>
      </div>
    </div>

      {
        replies.length ? <div onClick={(e) => activeReplyHandler(e)} id={`${reply}-${comment.id}`} className={reply}>
          {language === 'English' ? `There are ${replies.length} replies` : `   هناك ${replies.length} رد`}
        </div> : ''
      }
      {replies.length ? <div className={`${replyList} ${reply}-${comment.id}`}>
        {replies.map(rep => {
          const user = users.find((user => user.id === rep.user))
          // const replyInfo = replies?.find((reply => reply.comment === comment.id))

          return (
            <div className={replyBox}>
              <div className={replyer}>
                <div className={pic}>
                  <img src={`http://127.0.0.1:8000${user?.image}`} alt="" />
                </div>
                <div className={replyerName}>
                  {user?.name}
                </div>
              </div>
              <div className={text}>
                <p>{rep?.reply} <span
                  className={`${rep?.id}`}
                  id={`span-${rep?.id}`}
                >{language === 'English' ? `REPLY` : `الرد`}</span></p>
              </div>
              <div
                className={` ${inputField}`}
                id={`inp-${rep?.id}`} >
                <div className={input}>
                  <Input type="text" placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
                </div>
                <div className={icon}>
                  {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
                </div>
              </div>
            </div>
          )
        })}
      </div> : ''}
    </div >)
  });

  const chaptersList = chapters?.map((chapter, idx) => <li key={chapter.id}

    style={{ position: 'relative' }}
  >
    <span
    // onClick={() => navigate(`${chapter.id}`)}
    >
      {chapter.title}
    </span>
    {(user?.user_type === 'supervisor' || user?.user_type === 'admin') ?
      !bookInfo?.is_accept ? <Button style={language === 'Arabic' ? { position: 'absolute', right: '90%' } : { position: 'absolute', right: '10px' }} onClick={() => AcceptChapterHandler(chapter.id)}>
        {language === 'Arabic' ? 'قبول' : 'Accept'}
      </Button> : <Button style={language === 'Arabic' ? { backgroundColor: '#f35151', position: 'absolute', right: '90%' } : { backgroundColor: '#f35151', position: 'absolute', right: '10px' }} onClick={() => denyChapterHandler(chapter.id)}>
        {language === 'Arabic' ? 'رفض' : 'Deny'
        }      </Button>
      : ""}
  </li>)
  const authorData = users.find((user) => user.id === bookInfo?.user)
  return (
    <Container className={bookCont} >
      <div className={left}>
        <div className={pic}>
          <img src={`http://127.0.0.1:8000${bookInfo?.image}`} alt="" crossOrigin="anonymous" />
        </div>
        <div className={author} onClick={() => navigate(`/Binko/userInfo/${authorData?.id}/`)}>
          <h3>{language === 'English' ? `About The Author` : `عن الكاتب`}</h3>
          <div className={authInfo}>
            <div className={photo}>
              <img src={`http://127.0.0.1:8000${authorData?.image}`} alt="" />
            </div>
            <div className={nameAuth}>{authorData?.name}</div>
          </div>
          <div className={descAuth}>
            {authorData?.discriptions}
          </div>
        </div>
      </div>
      <div className={right}>
        <div className={up}>
          <h1>{bookInfo?.name}</h1>
          <span>{authorData?.name}</span>
          <div className={cate}>
            {categoriesBookCard}
          </div>
          <p className={loves}>{language === 'English' ? `200 Likes` : ` 200 اعجاب `} </p>
          <p className={desc}>{bookInfo?.description}</p>
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
            <li onClick={(e) => activeHandler(e)}><p>{language === 'English' ? `Like` : `أعجبني`}</p><div className={icons}>
              <div className={activeIcon}><LoveFillWhite style={{ width: '20px' }} /> </div><div className={icon}><LoveNotFill style={{ width: '20px' }} /></div></div></li>
            <li className={active} onClick={() => navigate(`${chapters[0].id}`)} ><p>{language === 'English' ? `Read` : `قراءة`}</p> <div className={icon}><Read style={{ width: '20px' }} /></div></li>
          </ul>
          {ExistedBook && user?.user_type === 'regular' ?
            <>
              <Button style={{ width: '100%' }}>{language === 'English' ? 'Edit' : "تعديل"}</Button>
              <Button onClick={deleteHandler} style={{ marginTop: '10px', backgroundColor: '#f35151', width: '100%' }}>{language === 'English' ? 'Delete' : "حذف"}</Button>
            </>
            : ''}
          {(user?.user_type === 'supervisor' || user?.user_type === 'admin') ?
            <Button onClick={denyHandler} style={bookInfo?.is_accept ? { backgroundColor: '#f35151', width: '100%' } : { width: '100%' }}>{bookInfo?.is_accept && language === 'English' ? 'Deny' : bookInfo?.is_accept && language === 'Arabic' ? " رفض" :
              !bookInfo?.is_accept && language === 'Arabic' ? 'قبول' :
                'Accept'}</Button>
            : ""}
        </div>
        <div className={down}>
          <HeadingTitle>{language === 'English' ? `Chapters` : `الفصول`}</HeadingTitle>
          {ExistedBook ? <Button onClick={() => navigate(`/Binko/books/${bookInfo?.id}/addChapter`)} style={{ width: '100%' }}>{language === 'English' ? 'Add Chapter' : "اضافة فصل"}</Button> : ''}
          <ul className={list}>
            {chaptersList.length ? chaptersList :
              language === 'English' ? 'There is no chapters yet' : 'لا يوجد فصول بعد'}

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
