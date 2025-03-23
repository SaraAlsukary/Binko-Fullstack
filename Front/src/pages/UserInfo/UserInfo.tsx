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
import { settingsBox } from '@utils/settingsForSlick';
import { TBooks } from '@customtypes/booksTypes';
import actGetBooks from '@store/booksSlice/act/actGetBooks';
const { profileContainer, settings, userName, pic, img, info } = style;

const UserInfo = () => {

    const { id } = useParams();
    const idx = parseInt(id as string);
    const { users } = useAppSelector(state => state.users);
    const booksFav = useAppSelector(state => state.favorite.books);
    const { myBooks, books } = useAppSelector(state => state.books);
    const { userData } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    // const booksCardsWrite = addBook.books.map((book => <BookCard {...book} />))
    const booksCardsFavorite = booksFav.map((book => <BookCard key={book.id} {...book} />))
    // const booksPublished = books.map((book1) => {
    //     const bookFilter = myBooks.find((book => book.id === book1.id))
    //     console.log(bookFilter)
    //     return bookFilter
    // }
    // )
    const booksPublished = books.filter(book => book.user?.id === idx)
    // const existedBooks = () => {
    //     let booksFill: TBooks[] = [];
    //     books.forEach((book1) => {
    //         const bookFilter: any = myBooks.find(book2 => book2.id === book1.id)
    //         booksFill.push(bookFilter)
    //     })
    //     return booksFill;

    // }
    // const booksPublished = existedBooks();
    const booksCardsPublished = booksPublished.map((book => <BookCard key={book?.id} {...book} />))
    useEffect(() => {
        dispatch(actGetUsers())
        dispatch(actGetfavorite(idx))
        dispatch(actGetBooks())
        dispatch(actGetMyBooks(idx))
    }, [])
    const userInfo = users.find(user => user.id === idx);

    return (
        <div className={profileContainer}>
            <Container>
                <div className={pic}>
                    <div className={img}>
                        <img src={`http://127.0.0.1:8000${userInfo?.image}`} alt="" />
                    </div>
                </div>
                <div className={userName}>
                    <h2>{userInfo?.name}</h2>
                </div>
                <div className="para">
                    <p>{userInfo?.discriptions}</p>
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
                                <div>
                                    {language === "English" ? 'Name:' : 'الاسم'} {userInfo?.name}
                                </div>
                                <div>
                                    {language === "English" ? 'Bio:' : 'نبذة'} {userInfo?.discriptions}
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title=
                            {language === 'English' ? 'Favorite' : 'المفضلة'}
                        >
                            <BookCardList type="box" settings={settingsBox}>{booksCardsFavorite}</BookCardList>

                        </Tab>
                        <Tab eventKey="longer-tab" title=
                            {language === 'English' ? 'Published Books' : 'الكتب المنشورة'}
                        >
                            <BookCardList type="box" settings={settingsBox}>{booksCardsPublished}</BookCardList>

                        </Tab>

                    </Tabs>
                </div>

            </Container> </div >
    );
}

export default UserInfo
