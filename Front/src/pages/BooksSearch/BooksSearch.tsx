import { Col, Container, Row } from 'react-bootstrap'
import Search from '@components/feedback/Search/Search';
import style from './BooksSearch.module.css';
import { useAppSelector } from '@hooks/app';
import BookCardSquare from '@components/Books/BookCardSquare/BookCardSquare';
import { useState } from 'react';
const { booksCardList, searchCont } = style;
const BooksSearch = () => {
    const [filt, setFilt] = useState('');
    const { books } = useAppSelector(state => state);
    // const { language } = useAppSelector(state => state.language);
    const result = books.books.filter((book => book.name.toLowerCase().includes(filt) || book.user.toLowerCase().includes(filt.toLowerCase())));
    const booksList = result.map((book) => <Col className='mb-3'><BookCardSquare key={book.id} {...book} /></Col>);
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
