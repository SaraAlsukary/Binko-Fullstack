import { useAppSelector } from '@hooks/app';
import style from './Chapters.module.css';
import { useNavigate, useParams } from 'react-router-dom';

import { Container } from 'react-bootstrap';
import { useState } from 'react';
import ChapterMenu from '@components/Chapters/ChapterMenu/ChapterMenu';
import SecondaryButton from '@components/feedback/SecondaryButton/SecondaryButton';
const { text, down, buttn, chapterCont } = style;
const Chapters = () => {
    const [disNext, setDisNext] = useState(false);
    const [disPrev, setDisPrev] = useState(false);
    const { chapters } = useAppSelector(state => state);
    const { language } = useAppSelector(state => state.language);
    const navigate = useNavigate();
    const param: any = useParams();
    const index = parseInt(param.idChapter);
    const chapterInfo = chapters[index];



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


    const nextNavigateHandler = async () => {
        var nextChapter;
        if (index === (chapters.length - 1)) {

            setDisNext(true);

        } else {
            setDisPrev(false);

            nextChapter = index + 1;
            navigate(`/Binko/books/${param.id}/${nextChapter}`);

        }


    }


    return (
        <Container className={chapterCont}>
            <ChapterMenu />
            <div className={down}>

                <div className={text}>
                    <h1>{chapterInfo?.title}</h1>
                    <p>{chapterInfo?.content}</p>
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
