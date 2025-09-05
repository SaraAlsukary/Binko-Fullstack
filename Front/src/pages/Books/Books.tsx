import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import { Container } from 'react-bootstrap';
import BookCardSquare from '@components/Books/BookCardSquare/BookCardSquare';
import { settingsBackground, settingsBox, settingsSquare } from '@utils/settingsForSlick';

import BookCardList from '@components/Books/BookCardList/BookCardList';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetBooks from '@store/booksSlice/act/actGetBooks';
import './BooksSlider.css'
import { TBooks } from '@customtypes/booksTypes';
import { useEffect } from 'react';
import actGetUsers from '@store/usersSlice/act/actGetUsers';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
const { bookContainer, box, square } = styles;

const Books = () => {
    const dispatch = useAppDispatch();
    const { books,loading,error } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);
    const booksCards = books.map(((book: TBooks) => {
        return <BookCard key={book.id}
            {...book} />

    }))
    const booksCardsSquare = books.map(((book: TBooks) => {
        return <BookCardSquare key={book.id} {...book} />

    }));
    // const booksCardsBackground = books.map(((book: TBooks) => <BooksBackground key={book.id} img={image} />));
    useEffect(() => {
        dispatch(actGetBooks())
        dispatch(actGetUsers())
    }, [])
    if (loading === 'pending')
        return <Loading />
    if (error !== null)
        return <Error />
    return (

        <div className={bookContainer}>
            <Container>
                <HeadingTitle>{language === 'English' ? 'Books' : 'الكتب'}</HeadingTitle>
                <BookCardList settings={settingsSquare} type={square}>
                    {booksCardsSquare}
                </BookCardList>

            </Container>
        </div >
    )
}

export default Books
