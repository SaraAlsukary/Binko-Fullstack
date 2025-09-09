import { useAppDispatch, useAppSelector } from '@hooks/app';
import style from './Chapters.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import ReactAudioPlayer from "react-audio-player";
import 'react-quill/dist/quill.snow.css';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ChapterMenu from '@components/Chapters/ChapterMenu/ChapterMenu';
import { Button } from '@components/feedback';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
import actShowChapter from '@store/chaptersSlice/act/actShowChapter';
import actGetChapters from '@store/chaptersSlice/act/actGetChapters';
import { Localhost } from '@utils/localhost';
const { text, down, chapterCont } = style;
const Chapters = () => {
    const [disNext, setDisNext] = useState(false);
    const [disPrev, setDisPrev] = useState(false);
    const { chapters, loading, error, chapter } = useAppSelector(state => state.chapters);
    const { language } = useAppSelector(state => state.language);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const param: any = useParams();
    const index = parseInt(param.idChapter);
    const idBook = parseInt(param.id);
    useEffect(() => {
        dispatch(actShowChapter(index))
        dispatch(actGetChapters(idBook))
    }, [])


    const prevNavigateHandler = () => {
        var prevChapter;

        if (index === 0) {
            setDisPrev(true);
        } else {
            setDisNext(false);
            prevChapter = index - 1;
            dispatch(actShowChapter(prevChapter))

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
            dispatch(actShowChapter(nextChapter))

            navigate(`/Binko/books/${param.id}/${nextChapter}`);

        }


    }

    const [show, setShow] = useState(false);
    if (loading === 'pending')
        return <Loading />
    if (error !== null)
        return <Error />
    return (
        <Container className={chapterCont}>
            <ChapterMenu />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px'
            }}>
                {!show && chapter?.audio ? <Button onClick={() => setShow(true)}>{language === 'English' ? "Audio" : "صوت"}</Button> : ""}
                {show && chapter?.audio ?
                    <ReactAudioPlayer controls src={`${Localhost}${chapter?.audio}`} />
                    : ""}
            </div>
            <div className={down}>

                <div className={text}>
                    <h1>{chapter?.title}</h1>


                    <div className={'contentText'} dangerouslySetInnerHTML={{ __html: chapter?.content_text! }} />

                </div>
                {/* {chapters.length > 1 && <div className={buttn}>
                    <SecondaryButton style={disNext ? { display: 'none' } : { display: 'block' }} disabled={disNext} onClick={() => nextNavigateHandler()}>{language === 'English' ? `Next Chapter` : `الفصل التالي`}</SecondaryButton>

                    <span className={` ${indexs} m-2`}  >
                        {language === 'English'
                            ? `Chapter ${index + 1} of ${chapters.length}`
                            : `الفصل ${index + 1} من ${chapters.length}`
                        }
                    </span>
                    <SecondaryButton style={disPrev ? { display: 'none' } : { display: 'block' }} disabled={disPrev} onClick={() => prevNavigateHandler()}>{language === 'English' ? `Previous Chapter` : `الفصل السابق`}</SecondaryButton>
                </div>} */}
            </div>
        </Container>

    )
}

export default Chapters
