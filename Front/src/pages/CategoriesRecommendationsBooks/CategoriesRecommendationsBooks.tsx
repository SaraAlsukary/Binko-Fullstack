import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import { Col, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useEffect } from 'react';
import { TBooks } from '@customtypes/booksTypes';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import { settingsBox } from '@utils/settingsForSlick';
import actGetRecommendationsByCategories from '@store/booksSlice/act/actGetRecommendationsByCategories';
import { useNavigate } from 'react-router-dom';
const { bookContainer } = styles;

const CategoriesRecommendationsBooks = ({ id }: { id: number }) => {
    const dispatch = useAppDispatch();
    const { recomBooks } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);
    const navigate = useNavigate()

    const booksCards = recomBooks.map(((book: TBooks, idx) =>
        <Col key={idx} onClick={() => navigate(0)}>
            <BookCard {...book} />
        </Col>
    ));
    useEffect(() => {
        dispatch(actGetRecommendationsByCategories(id))
    }, [])
    return (
        <>
            {
                recomBooks?.length ?
                    < div className={bookContainer} >

                        <Container>
                            <div className='mb-4'>
                                <HeadingTitle>{language === 'English' ? "More Books" : "كتب مشابهة"}</HeadingTitle>
                            </div>

                            <BookCardList settings={settingsBox} type={'box'}>
                                {booksCards}
                            </BookCardList>
                        </Container>
                    </div >
                    : ""
            }
        </>
    )
}

export default CategoriesRecommendationsBooks
