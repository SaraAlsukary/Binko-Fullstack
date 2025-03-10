import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import { Container } from 'react-bootstrap';
import BookCardSquare from '@components/Books/BookCardSquare/BookCardSquare';
import { settingsBackground, settingsBox, settingsSquare } from '@utils/settingsForSlick';

import BooksBackground from '@components/Books/BooksBackground/BooksBackground';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetBooks from '@store/booksSlice/act/actGetBooks';
import image from '@assets/imgs/s.jpg';
import './BooksSlider.css'
import { TBooks } from '@customtypes/booksTypes';
import { useEffect } from 'react';
import actGetUsers from '@store/usersSlice/act/actGetUsers';
const { bookContainer, box, square } = styles;

const Books = () => {
    const dispatch = useAppDispatch();
    const { books } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);
    const { users } = useAppSelector(state => state.users);
    const booksCards = books.map(((book: TBooks) => {
        const username = users.find(user => user.id == book.user)?.name;
        return <BookCard key={book.id} id={book.id} category={book.category} user={username} description={book.description} name={book.name} image={book.image} />

    }))
    const booksCardsSquare = books.map(((book: TBooks) => {
        const username = users.find(user => user.id == book.user)?.name;
        return <BookCardSquare key={book.id} id={book.id} category={book.category} user={username} description={book.description} name={book.name} image={book.image} />

    }));
    // const booksCardsBackground = books.map(((book: TBooks) => <BooksBackground key={book.id} img={image} />));
    useEffect(() => {
        dispatch(actGetBooks())
        dispatch(actGetUsers())
    }, [])
    return (

        <div className={bookContainer}>
            <Container>
                {/* 
                <BookCardList settings={settingsBackground} type={square}>
                    {booksCardsBackground}
                </BookCardList> */}
                <HeadingTitle>{language === 'English' ? 'Fantasy' : 'فنتازيا'}</HeadingTitle>
                <BookCardList settings={settingsBox} type={box}>
                    {booksCards}
                </BookCardList>
                {/* <BookCardList settings={settingsBackground} type={square}>
                    {booksCardsBackground}
                </BookCardList> */}
                <HeadingTitle>{language === 'English' ? 'Action' : 'أكشن'}</HeadingTitle>

                <BookCardList settings={settingsSquare} type={square}>
                    {booksCardsSquare}
                </BookCardList>

            </Container>
        </div >
    )
}

export default Books
