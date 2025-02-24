import { useEffect, useState } from 'react';
import style from './UserInfo.module.css';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import BookCard from '@components/Books/BookCard/BookCard';
import { Container, Tab, Tabs } from 'react-bootstrap';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import { Button } from '@components/feedback';
import { useParams } from 'react-router-dom';
import actGetUsers from '@store/usersSlice/act/actGetUsers';
import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import actGetMyBooks from '@store/booksSlice/act/actGetMyBooks';
const { profileContainer, settings, userName, pic, img, info } = style;

const UserInfo = () => {

    const [file, setFile] = useState('');
    const { id } = useParams();
    const idx = parseInt(id);
    const { users } = useAppSelector(state => state.users);
    const { books } = useAppSelector(state => state.favorite);
    const { myBooks } = useAppSelector(state => state.books);
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    // const booksCardsWrite = addBook.books.map((book => <BookCard {...book} />))
    const booksCardsFavorite = books.map((book => <BookCard {...book} />))
    const booksCardsPublished = myBooks.map((book => <BookCard {...book} />))
    const userInfo = users.find(user => user.id === idx);
    useEffect(() => {
        dispatch(actGetUsers())
        dispatch(actGetfavorite(idx))
        dispatch(actGetMyBooks(idx))
    }, [])

    return (
        <div className={profileContainer}>
            <Container>
                <div className={pic}>
                    <div className={img}>
                        <img src={`http://127.0.0.1:8000${userInfo?.image}`} alt="" />
                    </div>
                </div>
                <div className="para">
                    <p>{userInfo?.discriptions}</p>
                </div>
                <div className={userName}>
                    <h2>{userInfo?.name}</h2>
                </div>
                <div className={userName}>
                    <Button>{language === 'Arabic' ? 'محادثة' : "Chat"}</Button>
                </div>
                <div className={settings}>
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="home" title={language === 'English' ? 'Info' : 'نبذة'}
                        ><div className={info}>
                                info
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title=
                            {language === 'English' ? 'Favorite' : 'المفضلة'}
                        >
                            <BookCardList>{booksCardsFavorite}</BookCardList>

                        </Tab>
                        <Tab eventKey="longer-tab" title=
                            {language === 'English' ? 'Published Books' : 'الكتب المنشورة'}
                        >
                            <BookCardList>{booksCardsPublished}</BookCardList>

                        </Tab>

                    </Tabs>
                </div>

            </Container> </div >
    );
}

export default UserInfo
