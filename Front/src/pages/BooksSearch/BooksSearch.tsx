import { Col, Container, Row } from 'react-bootstrap'
import Search from '@components/feedback/Search/Search';
import style from './BooksSearch.module.css';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import BookCardSquare from '@components/Books/BookCardSquare/BookCardSquare';
import { useEffect, useState } from 'react';
import actGetBooks from '@store/booksSlice/act/actGetBooks';
import { TBooks } from '@customtypes/booksTypes';
const { booksCardList, searchCont, SearchList, search } = style;
const BooksSearch = () => {
    const [filt, setFilt] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchListData, setSearchListData] = useState<TBooks[]>([]);
    const { books } = useAppSelector(state => state.books);
    const { language } = useAppSelector(state => state.language);

    const result = books.filter((book => book?.name?.toLowerCase().includes(filt.toLowerCase()) || book?.user?.name.toLowerCase().includes(filt.toLowerCase())));

    const searchHandler = async (name: string, e: any) => {
        (e.target as Element).parentElement!.style.display = "none";
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const result = books.filter((book => book?.name?.toLowerCase().includes(name.toLowerCase())));
        setSearchListData(result)
        setLoading(false)
    }
    const booksList = searchListData.map((book) => {
        return (<Col className='mb-3'>
            <BookCardSquare id={book.id} key={book.id} {...book} />
        </Col>)
    });
    const searchList = result.map(res =>
        <li onClick={(e) => searchHandler(res.name!, e)} key={res.id}>
            <div>{res.name}</div>
            <div>{res.user?.name}</div>
        </li>
    )
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(actGetBooks())
    }, [])
    useEffect(() => {
        if(filt)
        document.querySelector(`.${SearchList}`)!.style.display = 'block';
    }, [filt])
    useEffect(() => {
        if (books)
            setSearchListData(books)
    }, [books])
    const backgound = () => {
        document.body.addEventListener('click', (e: any) => {
            const element = (e.target as Element)
            if (element.parentElement!.className !== SearchList)
                document.querySelector(`.${SearchList}`)!.style.display = 'none';
        });

    }
    backgound()
    return (
        <Container className='mt-4'>
            <div className={searchCont}>
                <Search onChange={(e) => setFilt(e.target.value)} className={search} />
                {filt && <ul className={SearchList}>{searchList}</ul>}
            </div>
            {loading ? language === 'English' ? 'loading...' : "يتم التحميل..." : <Row className={booksCardList}>
                {booksList}
            </Row>}
        </Container >
    )
}

export default BooksSearch
