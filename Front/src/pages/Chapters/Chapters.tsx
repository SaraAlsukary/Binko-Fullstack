import { useAppDispatch, useAppSelector } from '@hooks/app';
import style from './Chapters.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import ReactAudioPlayer from "react-audio-player";
import 'react-quill/dist/quill.snow.css';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ChapterMenu from '@components/Chapters/ChapterMenu/ChapterMenu';
import SecondaryButton from '@components/feedback/SecondaryButton/SecondaryButton';
import actGetChapters from '@store/chaptersSlice/act/actGetChapters';
import actGetMyBooks from '@store/booksSlice/act/actGetMyBooks';
import { Button } from '@components/feedback';
import actGetChaptersNotes from '@store/chaptersSlice/act/actGetChaptersNotes';
import actGetAcceptedChapters from '@store/chaptersSlice/act/actGetAcceptedChapter';
import actAddBookReading from '@store/booksSlice/act/actAddBookReading';
const { warnings, text, down, buttn, chapterCont } = style;
const Chapters = () => {
    const [disNext, setDisNext] = useState(false);
    const [disPrev, setDisPrev] = useState(false);
    const { chapters, acceptedchapters, notes } = useAppSelector(state => state.chapters);
    const { myBooks } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);
    const { userData } = useAppSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const param: any = useParams();
    const index = parseInt(param.idChapter);
    const idBook = parseInt(param.id);
    const chapterInfoItem = (userData?.user.is_supervisor || userData?.user.is_admin || myBooks.find(book => book.id === idBook)) ? acceptedchapters.find(ch => ch.id === index) : chapters.find(ch => ch.id === index);

    const chapterInfo = (userData?.user.is_supervisor || userData?.user.is_admin) && (!chapterInfoItem) ? chapters.find(ch => ch.id === index) : chapterInfoItem;
    const formRead:{book_id:number} = {
        book_id: idBook
    }
    useEffect(() => {
        dispatch(actGetChapters(param.id))
        dispatch(actGetAcceptedChapters())
        dispatch(actGetMyBooks(userData?.user.id))
        dispatch(actGetChaptersNotes(index))
        dispatch(actAddBookReading(formRead))

    }, [])

    const prevNavigateHandler = () => {
        var prevChapter;

        if (index === 0) {
            setDisPrev(true);
        } else {
            setDisNext(false);
            prevChapter = index - 1;
            navigate(`/Binko/books/${param.id}/${prevChapter}`);

        }



    }

    const nextNavigateHandler = () => {
        var nextChapter;
        if (index === (chapters.length - 1)) {

            setDisNext(true);

        } else {
            setDisPrev(false);

            nextChapter = index + 1;
            navigate(`/Binko/books/${param.id}/${nextChapter}`);

        }


    }

    const [show, setShow] = useState(false);
    return (
        <Container className={chapterCont}>
            <ChapterMenu />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px'
            }}>
                {!show && chapterInfo?.audio ? <Button onClick={() => setShow(true)}>{language === 'English' ? "Audio" : "صوت"}</Button> : ""}
                {show && chapterInfo?.audio ?
                    <ReactAudioPlayer controls src={`http://127.0.0.1:8000${chapterInfo?.audio}`} />
                    : ""}
            </div>
            <div className={down}>

                <div className={text}>
                    <h1>{chapterInfo?.title}</h1>

                    {/* <p>{chapterInfo?.content_text}</p> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: value }} /> */}
                    <div className={'contentText'} dangerouslySetInnerHTML={{ __html: chapterInfo?.content_text }} />

                </div>
                <div className={buttn}>
                    <SecondaryButton style={disNext ? { display: 'none' } : { display: 'block' }} disabled={disNext} onClick={() => nextNavigateHandler()}>{language === 'English' ? `Next Chapter` : `الفصل التالي`}</SecondaryButton>
                    <SecondaryButton style={disPrev ? { display: 'none' } : { display: 'block' }} disabled={disPrev} onClick={() => prevNavigateHandler()}>{language === 'English' ? `Previous Chapter` : `الفصل السابق`}</SecondaryButton>
                </div>
            </div>
        </Container>

    )
}

export default Chapters
