import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import {  Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useEffect } from 'react';
import { TBooks } from '@customtypes/booksTypes';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import { settingsBox } from '@utils/settingsForSlick';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
import actGetForeignBooks from '@store/booksSlice/act/actGetForeignBooks';
const { bookContainer } = styles;

const ForeignBooks = () => {
    const dispatch = useAppDispatch();
    const { foreignBooks, loading, error } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);


    const booksCards = foreignBooks.map(((book: TBooks, idx) =>
            <BookCard key={idx} {...book} />
    ));

    useEffect(() => {
        dispatch(actGetForeignBooks())
    }, [])

    return (

        <div className={bookContainer}>

            <Container>
                <div className='mb-4'>
                    <HeadingTitle>{language === 'English' ? "English Books" : " الكتب الانجليزية"}</HeadingTitle>
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

export default ForeignBooks
