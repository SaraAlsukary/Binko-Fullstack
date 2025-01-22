import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Profile.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import { Input } from '@components/feedback';
import Picture from '@components/common/Picture/Picture';

const { profileContainer, settings, userName, inputs, info } = styles;
function Profile() {
    const [imageFile, setImageFile] = useState('');
    const [file, setFile] = useState('');
    const imageHandler = (e: any) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
        console.log(file)
    }
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    const { addBook, favorite, auth, books } = useAppSelector(state => state);
    const booksCardsWrite = addBook.books.map((book => <BookCard {...book} />))
    const booksCardsFavorite = favorite.books.map((book => <BookCard {...book} />))
    const booksCardsPublished = books.books.map((book => <BookCard {...book} />))

    const data = {
        // file: imageFile,
        // username,
        // password,


    }

    // useEffect(() => {
    // dispatch(actGetfavorite(auth.accessToken));
    // }, [])

    return (
        <div className={profileContainer}>
            <Container>
                <Picture imageHandler={imageHandler} file={file} />
                <div className={userName}>
                    <h2>Sara Alsukary</h2>
                </div>
                <div className={settings}>
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="home" title={language === 'English' ? 'Settings' : 'الإعدادات'}
                        ><div className={inputs}>

                                <div className={info}>
                                    info

                                </div>
                                <Input type='text' value={auth.user?.name} placeholder={language === 'Arabic' ? 'info' : 'نبذة'} />
                                <Input type='text' value={auth.user?.name} placeholder={language === 'Arabic' ? 'userame' : 'اسم المستخدم'} />
                                <Input type='email' value={auth.user?.username} placeholder={language === 'Arabic' ? 'email' : 'ايميل'} />
                                <Input type='password' value={auth.user?.password} placeholder={language === 'Arabic' ? 'password' : 'كلمة المرور'} />
                                <Input type='submit' value={language === 'Arabic' ? 'تغيير' : 'Change'} />
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title=
                            {language === 'English' ? 'My Favorite' : 'مفضلتي'}
                        >
                            <BookCardList>{booksCardsFavorite}</BookCardList>

                        </Tab>
                        <Tab eventKey="longer-tab" title=
                            {language === 'English' ? 'My Published Books' : 'كتبي المنشورة'}
                        >
                            <BookCardList>{booksCardsPublished}</BookCardList>

                        </Tab>
                        <Tab eventKey="contact" title=
                            {language === 'English' ? 'My Saved Books' : 'كتبي المحفوظة'}

                        >
                            <BookCardList>{booksCardsWrite}</BookCardList>

                        </Tab>

                    </Tabs>
                </div>

            </Container> </div >
    );
}

export default Profile;