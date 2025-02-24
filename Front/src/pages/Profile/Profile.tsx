import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Profile.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import BookCardList from '@components/Books/BookCardList/BookCardList';
// import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import { Button, Input } from '@components/feedback';
import Picture from '@components/common/Picture/Picture';
import SecondaryButton from '@components/feedback/SecondaryButton/SecondaryButton';
import { actLogout, actUpdateProfile, authLogout } from '@store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { settingsBox } from '@utils/settingsForSlick';
import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import actGetMyBooks from '@store/booksSlice/act/actGetMyBooks';
import actGetUsers from '@store/usersSlice/act/actGetUsers';

const { profileContainer, settings, userName, inputs, info } = styles;
function Profile() {
    const [imageFile, setImageFile] = useState('');
    const [name, setName] = useState('');
    const [des, setDes] = useState('');
    const [file, setFile] = useState('');
    const imageHandler = (e: any) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
        console.log(file)
    }

    const navigate = useNavigate();

    const logoutHandler = async () => {
        // dispatch(actLogout())
        //     .unwrap()
        //     .then(
        //         () => {
        //             navigate('/Binko/');

        //         }
        //     )

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            dispatch(authLogout())
            navigate('/Binko/');

        } catch (error) {
            console.log(error)
        }
    }
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    const { favorite, auth, books, users } = useAppSelector(state => state);

    // const booksCardsWrite = addBook.books.map((book => <BookCard image={book.image} name={book.name} id={book.id} user={auth.user?.username} />))
    const booksCardsFavorite = favorite.books.map((book => {
        const userName = users.users.find(user => user.id == book.user)?.name;
        return <BookCard name={book.name} category={book.category} image={book.image} user={userName} id={book.id} description={book.description} />

    }))
    const booksCardsPublished = books.myBooks.map((book => {
        const userName = users.users.find(user => user.id === book.user)?.name;
        return <BookCard name={book.name} category={book.category} image={book.image} user={userName} id={book.id} description={book.description} />

    }))
    const dataform = new FormData

    const updateHandler = () => {
        dataform.append('image', imageFile)
        dataform.append('discriptions', des)
        dataform.append('name', name)
        dispatch(actUpdateProfile(dataform)).unwrap().then(() => {
            alert('successfully updated profile!')
        })
    }
    useEffect(() => {
        dispatch(actGetfavorite(auth.user?.id));
        dispatch(actGetMyBooks(auth.user?.id));
        dispatch(actGetUsers());
    }, [])
    const userData = users.users.find(user => auth.user?.id === user.id);
    return (
        <div className={profileContainer}>
            <Container>
                <Picture imageHandler={imageHandler} file={file} image={`http://127.0.0.1:8000${userData?.image}`} />
                <div className={userName}>
                    <h2>{userData?.name}</h2>
                    <p>{userData?.discriptions}</p>
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
                                    {language === 'English' ? "Change My informations" : "تغيير معلوماتي "}
                                </div>
                                <Input onChange={(e: any) => setDes(e.target.value)} type='text' value={auth.user?.discriptions} placeholder={language === 'Arabic' ? 'info' : 'نبذة'} />
                                <Input onChange={(e: any) => setName(e.target.value)} type='text' value={auth.user?.discriptions} placeholder={language === 'Arabic' ? 'userame' : 'اسم المستخدم'} />
                                {/* <Input type='email' value={auth.user?.username} placeholder={language === 'Arabic' ? 'email' : 'ايميل'} /> */}
                                {/* <Input type='password' value={auth.user?.password} placeholder={language === 'Arabic' ? 'password' : 'كلمة المرور'} /> */}
                                <Input onClick={updateHandler} type='submit' value={language === 'Arabic' ? 'تغيير' : 'Change'} />
                                <SecondaryButton onClick={logoutHandler} style={{ height: '50px', width: '100px', marginTop: "10px" }}>{language === 'Arabic' ? ' تسجيل الخروج ' : 'Logout'} </SecondaryButton>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title=
                            {language === 'English' ? 'My Favorite' : 'مفضلتي'}
                        >
                            <BookCardList type='box' settings={settingsBox}>{booksCardsFavorite}</BookCardList>

                        </Tab>
                        <Tab eventKey="longer-tab" title=
                            {language === 'English' ? 'My Published Books' : 'كتبي المنشورة'}
                        >
                            <BookCardList type='box' settings={settingsBox}>{booksCardsPublished}</BookCardList>

                        </Tab>
                        {/* <Tab eventKey="contact" title=
                            {language === 'English' ? 'My Saved Books' : 'كتبي المحفوظة'}

                        >
                            <BookCardList type='box' settings={settingsBox}>{booksCardsWrite}</BookCardList>

                        </Tab> */}

                    </Tabs>
                </div>

            </Container> </div >
    );
}

export default Profile;