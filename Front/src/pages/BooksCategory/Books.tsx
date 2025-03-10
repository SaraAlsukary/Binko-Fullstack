import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import { Container } from 'react-bootstrap';
import BookCardSquare from '@components/Books/BookCardSquare/BookCardSquare';
import { settingsBox, settingsSquare } from '@utils/settingsForSlick';

import BookCardList from '@components/Books/BookCardList/BookCardList';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import './BooksSlider.css'
import { TBooks } from '@customtypes/booksTypes';
import { useEffect } from 'react';
import actGetUsers from '@store/usersSlice/act/actGetUsers';
import { useParams } from 'react-router-dom';
import actGetBooksByCategory from '@store/booksSlice/act/actGetBooksByCate';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import { actClearBook } from '@store/booksSlice/booksSlice';
import { actClearCategories } from '@store/categorySlice/categorySlice';
import { actClearUsers } from '@store/usersSlice/userSlice';
const { bookContainer, box, square } = styles;

const Books = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const idx = parseInt(id);
    const { books } = useAppSelector(state => state.books);
    const { categories } = useAppSelector(state => state.categories);
    const { language } = useAppSelector(state => state.language);
    const { users } = useAppSelector(state => state.users);
    const booksCards = books.map(((book: TBooks) => {
        const username = users.find(user => user.id == book.user)?.name;
        return <BookCard id={book.id} category={book.category} user={username} description={book.description} name={book.name} image={book.image} />

    }))
    const categoryInfo = categories.find((cate) => cate.id === idx)
    const booksCardsSquare = books.map(((book: TBooks) => {
        const username = users.find(user => user.id == book.user)?.name;
        return <BookCardSquare id={book.id} category={book.category} user={username} description={book.description} name={book.name} image={book.image} />

    }));
    // const booksCardsBackground = books.map(((book: TBooks) => <BooksBackground key={book.id} img={image} />));
    useEffect(() => {
        const promiseBooks = dispatch(actGetBooksByCategory(idx))
        const promiseCategories = dispatch(actGetCategories())
        const promiseUsers = dispatch(actGetUsers())
        return () => {
            promiseBooks.abort();
            promiseCategories.abort();
            promiseUsers.abort();

            dispatch(actClearBook());
            dispatch(actClearCategories());
            dispatch(actClearUsers());
        }
    }, [])
    return (

        <div className={bookContainer}>
            <Container>
                {/* 
                <BookCardList settings={settingsBackground} type={square}>
                    {booksCardsBackground}
                </BookCardList> */}
                <HeadingTitle>{language === 'English' ? categoryInfo?.name : categoryInfo?.name_arabic}</HeadingTitle>
                <BookCardList settings={settingsBox} type={box}>
                    {booksCards}
                </BookCardList>
                {/* <BookCardList settings={settingsBackground} type={square}>
                    {booksCardsBackground}
                </BookCardList> */}
                {/* <HeadingTitle>{language === 'English' ? 'Action' : 'أكشن'}</HeadingTitle> */}
                <HeadingTitle>{language === 'English' ? categoryInfo?.name : categoryInfo?.name_arabic}</HeadingTitle>

                <BookCardList settings={settingsSquare} type={square}>
                    {booksCardsSquare}
                </BookCardList>

            </Container>
        </div >
    )
}

export default Books
