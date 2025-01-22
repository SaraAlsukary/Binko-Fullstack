import { useAppSelector } from "@hooks/app";
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
const { left, pic, author, boxCont, photo, reply, replyBox, replyer, replyerName, replyList, commentsList, authInfo, icons, commenter, commenterName,
  text, bookCont, nameAuth, buttn, icon, activeIcon, inputField, descAuth, right, list, up, down, active, cate, loves, input, desc, comments, box } = style;
const BooksInfo = () => {
  const { language } = useAppSelector(state => state.language)
  const { id }: any = useParams();
  const param: any = useParams();
  console.log(param);
  const { chapters } = useAppSelector(state => state);
  const { books } = useAppSelector(state => state);
  const bookInfo = books.books.find(book => book.id == id);
  const navigate = useNavigate();
  const activeHandler = (e: any) => {
    (e.target as Element).classList.toggle(active);
  }
  const activeMoreHandler = () => {
    var el = document.getElementById('com');
    el?.classList.add(active);
  }
  const activeReplyHandler = (e: any) => {
    if (e.target.id !== null)
      var nameId = e.target.id;
    console.log(nameId)
    var el = document.querySelector(`.${nameId}`);
    console.log(el)
    el?.classList.add(active);
    (e.target as Element).classList.add(active);

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
  unactiveInputHandler();
  const commentsArray = useAppSelector(state => state.comments);
  const commentsListElements = commentsArray.map(comment => <div key={comment?.id} className={boxCont}><div className={box}>
    <div className={commenter}>
      <div className={pic}>
        <img src={comment?.img} alt="" />
      </div>
      <div className={commenterName}>
        {comment?.commenterName}
      </div>
    </div>
    <div className={text}>
      <p>{comment?.text} <span
        className={`${comment?.id}`}
        id={`span-${comment?.id}`}
      >{language === 'English' ? `REPLY` : `الرد`}</span></p>
    </div>
    <div
      className={` ${inputField}`}
      id={`inp-${comment?.id}`} >
      <div className={input}>
        <Input type="text" placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
      </div>
      <div className={icon}>
        {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
      </div>
    </div>
  </div>
    {
      comment?.reply.length ? <div onClick={(e) => activeReplyHandler(e)} id={`${reply}-${comment.id}`} className={reply}>
        {language === 'English' ? `There are ${comment.reply.length} replies` : `   هناك ${comment.reply.length} رد`}
      </div> : ''
    }
    {comment?.reply.length ? <div className={`${replyList} ${reply}-${comment.id}`}>
      {comment?.reply.map(rep => <div className={replyBox}>
        <div className={replyer}>
          <div className={pic}>
            <img src={rep?.img} alt="" />
          </div>
          <div className={replyerName}>
            {rep?.commenterName}
          </div>
        </div>
        <div className={text}>
          <p>{rep?.text} <span
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
      )}
    </div> : ''}
  </div >);
  const chaptersList = chapters.map((chapter, idx) => <li key={chapter.id} onClick={() => navigate(`${idx}`)}>{chapter.title}</li>)
  return (
    <Container className={bookCont} >
      <div className={left}>
        <div className={pic}>
          <img src={bookInfo?.image} alt="" crossOrigin="anonymous" />
        </div>
        <div className={author}>
          <h3>{language === 'English' ? `About The Author` : `عن الكاتب`}</h3>
          <div className={authInfo}>
            <div className={photo}>
              <img src={bookInfo?.image} alt="" />
            </div>
            <div className={nameAuth}>Author Name</div>
          </div>
          <div className={descAuth}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel cupiditate natus facere possimus exercitationem quaerat itaque neque nobis alias magnam inventore illum repudiandae, quisquam aliquam pariatur quasi ab temporibus necessitatibus.
          </div>
        </div>
      </div>
      <div className={right}>
        <div className={up}>
          <h1>{bookInfo?.name}</h1>
          <span>{bookInfo?.user}</span>
          <div className={cate}>
            <p>Drama</p>
            <p>Advanture</p>
            <p>Romance</p>
          </div>
          <p className={loves}>{language === 'English' ? `200 Likes` : ` 200 اعجاب `} </p>
          <p className={desc}>{bookInfo?.description}</p>
          <ul>
            <li onClick={(e) => activeHandler(e)}><p>{language === 'English' ? `Save` : `حفظ`} </p><div className={icons}>
              <div className={activeIcon}><BookMarkWhite style={{ width: '20px' }} /> </div><div className={icon}><BookMark style={{ width: '20px' }} /></div></div></li>
            <li onClick={(e) => activeHandler(e)}><p>{language === 'English' ? `Like` : `أعجبني`}</p><div className={icons}>
              <div className={activeIcon}><LoveFillWhite style={{ width: '20px' }} /> </div><div className={icon}><LoveNotFill style={{ width: '20px' }} /></div></div></li>
            <li className={active} onClick={() => navigate(`0`)} ><p>{language === 'English' ? `Read` : `قراءة`}</p> <div className={icon}><Read style={{ width: '20px' }} /></div></li>
          </ul>
        </div>
        <div className={down}>
          <HeadingTitle>{language === 'English' ? `Chapters` : `الفصول`}</HeadingTitle>

          <ul className={list}>
            {chaptersList}
          </ul>
          <div className={comments}>

            <HeadingTitle>{language === 'English' ? `Comments` : `التعليقات`}</HeadingTitle>
            <div className={inputField}>
              <div className={input}>
                <Input type="text" placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
              </div>
              <div className={icon}>
                {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
              </div>
            </div>
            <div id="com" className={commentsList}>
              {commentsListElements}
              <div onClick={() => { activeMoreHandler() }} className={buttn}>
                <Button>{language === 'English' ? `More` : `المزيد`}</Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Container >
  )
}

export default BooksInfo
