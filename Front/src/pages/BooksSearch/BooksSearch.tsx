import { Col, Container, Row } from 'react-bootstrap'
import Search from '@components/feedback/Search/Search';
import style from './BooksSearch.module.css';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import BookCardSquare from '@components/Books/BookCardSquare/BookCardSquare';
import { useEffect, useState } from 'react';
import actGetUsers from '@store/usersSlice/act/actGetUsers';
const { booksCardList, searchCont } = style;
const BooksSearch = () => {
    const [filt, setFilt] = useState('');
    const { users } = useAppSelector(state => state.users);
    const { books } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);

    const result = books.filter((book => book?.name.toLowerCase().includes(filt) || book?.user.toLowerCase().includes(filt.toLowerCase())));
    const booksList = result.map((book) => {
        const userInfo = users.find(use => use.id === book.user);
        return (<Col className='mb-3'>
            <BookCardSquare id={book.id} key={book.id} image={book.image} name={book.name} description={book.description} user={userInfo?.name} />
        </Col>)
    });
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actGetUsers())
    }, [])
    return (
        <Container className='mt-4'>
            <div className={searchCont}>
                <Search onChange={(e) => setFilt(e.target.value)} />
            </div>

            <Row className={booksCardList}>
                {booksList}
            </Row>
        </Container >
    )
}

export default BooksSearch
