import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Books.module.css';
import { Col, Container} from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useEffect } from 'react';
import { TBooks } from '@customtypes/booksTypes';
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import { settingsBox } from '@utils/settingsForSlick';
import actLatestBooks from '@store/booksSlice/act/actLatestBooks';
const { bookContainer } = styles;

const LastBooks = () => {
    const dispatch = useAppDispatch();
    const { latestBooks } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);


    const booksCards = latestBooks.map(((book: TBooks, idx) =>
        <Col key={idx}>
            <BookCard {...book} />
        </Col>
    ));
    useEffect(() => {
        dispatch(actLatestBooks())
    }, [])
    return (

        <div className={bookContainer}>

            <Container>
                <div className='mb-4'>
                    <HeadingTitle>{language === 'English' ? "Latest Books" : "أحدث الكتب"}</HeadingTitle>
                </div>
                {/* <Row style={{ marginTop: "30px" }}>
                    {booksCards}
                </Row> */}
                <BookCardList settings={settingsBox} type={'box'}>
                    {booksCards}
                </BookCardList>
            </Container>
        </div >
    )
}

export default LastBooks
