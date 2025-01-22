import { useState } from 'react';
import style from './UserInfo.module.css';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import BookCard from '@components/Books/BookCard/BookCard';
import { Container, Tab, Tabs } from 'react-bootstrap';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import { Button } from '@components/feedback';
const { profileContainer, settings, userName, pic, img, info } = style;

const UserInfo = () => {

    const [file, setFile] = useState('');

    // const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    const { favorite, books } = useAppSelector(state => state);
    // const booksCardsWrite = addBook.books.map((book => <BookCard {...book} />))
    const booksCardsFavorite = favorite.books.map((book => <BookCard {...book} />))
    const booksCardsPublished = books.books.map((book => <BookCard {...book} />))

    // const data = {
    //     // file: imageFile,
    //     // username,
    //     // password,


    // }

    // useEffect(() => {
    //     dispatch(actGetfavorite(auth.accessToken));
    // }, [])

    return (
        <div className={profileContainer}>
            <Container>
                <div className={pic}>
                    <div className={img}>
                        <img src={file} alt="" />
                    </div>                </div>
                <div className={userName}>
                    <h2>Sara Alsukary</h2>
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
