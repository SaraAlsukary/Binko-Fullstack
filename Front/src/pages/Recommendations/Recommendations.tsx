import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import { Col, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useEffect } from 'react';
import { TBooks } from '@customtypes/booksTypes';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import { settingsBox } from '@utils/settingsForSlick';
import actGetRecommendations from '@store/booksSlice/act/actGetRecommendations';
const { bookContainer } = styles;

const Recommendations = () => {
    const dispatch = useAppDispatch();
    const { recomBooks } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);


    const booksCards = recomBooks.map(((book: TBooks, idx) =>
        <Col key={idx}>
            <BookCard {...book} />
        </Col>
    ));
    useEffect(() => {
        dispatch(actGetRecommendations())
    }, [])
    return (

        <div className={bookContainer}>

            <Container>
                <div className='mb-4'>
                    <HeadingTitle>{language === 'English' ? "Recommendations For You" : "كتب مقترحة لك"}</HeadingTitle>
                </div>
                <BookCardList settings={settingsBox} type={'box'}>
                    {booksCards}
                </BookCardList>
            </Container>
        </div >
    )
}

export default Recommendations
