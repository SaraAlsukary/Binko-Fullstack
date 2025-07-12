import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useEffect } from 'react';
import actTopBooks from '@store/booksSlice/act/actTopBooks';
import { TBooks } from '@customtypes/booksTypes';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
const { bookContainer } = styles;

const Books = () => {
    const dispatch = useAppDispatch();
    const { topBooks } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);


    const booksCards = topBooks.map(((book: TBooks, idx) =>
        <Col key={idx}>
            <BookCard {...book} />
        </Col>
    ));
    useEffect(() => {
        dispatch(actTopBooks())
    }, [])
    return (

        <div className={bookContainer}>

            <Container>
                <HeadingTitle>{language === 'English' ? "Top Books" : "أفضل الكتب"}</HeadingTitle>
                <Row style={{ marginTop: "30px" }}>
                    {booksCards}
                </Row>

            </Container>
        </div >
    )
}

export default Books
