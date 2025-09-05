import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import { Col, Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useEffect } from 'react';
import { TBooks } from '@customtypes/booksTypes';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import { settingsBox } from '@utils/settingsForSlick';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
import actGetArBooks from '@store/booksSlice/act/actGetArBooks';
const { bookContainer } = styles;

const ArabicBooks = () => {
    const dispatch = useAppDispatch();
    const { arabicBooks, loading, error } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);


    const booksCards = arabicBooks.map(((book: TBooks, idx) =>
            <BookCard key={idx} {...book} />
    ));

    useEffect(() => {
    dispatch(actGetArBooks())
    }, [])

    return (

        <div className={bookContainer}>

            <Container>
                <div className='mb-4'>
                    <HeadingTitle>{language === 'English' ? "Arabic Books" : " الكتب العربية"}</HeadingTitle>
                </div>
                {loading === ("pending" as any) ?
                    <Loading /> :
                    error !== null ?
                        <Error /> :
                        <BookCardList settings={settingsBox} type={'box'}>
                            {booksCards}
                        </BookCardList>
                }
            </Container>
        </div >
    )
}

export default ArabicBooks
