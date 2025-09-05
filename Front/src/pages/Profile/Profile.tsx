import BookCard from '@components/Books/BookCard/BookCard';
import styles from './Profile.module.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import BookCardList from '@components/Books/BookCardList/BookCardList';
// import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import { Input } from '@components/feedback';
import Picture from '@components/common/Picture/Picture';
import SecondaryButton from '@components/feedback/SecondaryButton/SecondaryButton';
import { actUpdateProfile, authLogout } from '@store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { settingsBox } from '@utils/settingsForSlick';
import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import actGetMyBooks from '@store/booksSlice/act/actGetMyBooks';
import toast from 'react-hot-toast';
import { Localhost } from '@utils/localhost';

const { profileContainer, settings, userName, inputs, info, pp } = styles;
function Profile() {
    const [imageFile, setImageFile] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState<null | number>(null);
    const [des, setDes] = useState('');
    const [file, setFile] = useState('');
    const imageHandler = (e: any) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
    }

    const navigate = useNavigate();

    const logoutHandler = async () => {
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
    const { myBooks } = useAppSelector(state => state.books);
    const {  books } = useAppSelector(state => state.favorite);
    const { userData } = useAppSelector(state => state.auth);

    const booksCardsFavorite = books.map((book => {
        return <BookCard key={book.id} {...book} />

    }))

    const booksCardsPublished = myBooks.map((book => {
        return <BookCard key={book.id} {...book} />

    }))
    const dataform = new FormData
    const updateHandler = () => {
        dataform.append('image', imageFile)
        dataform.append('discriptions', des)
        dataform.append('age', age as any)
        dataform.append('is_reader', userData?.user.is_reader as any)
        dataform.append('name', name)
        dispatch(actUpdateProfile(dataform))
            .unwrap()
            .then(() => {
                toast.success('successfully updated profile!')
            })
    }
    useEffect(() => {
        dispatch(actGetfavorite(userData!.user?.id));
        dispatch(actGetMyBooks(userData!.user?.id));
    }, [])
    return (
        <div className={profileContainer}>
            <Container>
                <Picture imageHandler={imageHandler} file={file} image={`${Localhost}${userData?.user?.image}`} />
                <div className={userName}>
                    <div>
                        <h2>{userData?.user?.name}</h2>
                    </div>                    <div className="reader">
                        <p>{userData?.user.is_reader === true && language === 'English' ? "Reader" : userData?.user?.is_reader === true && language === 'Arabic' ? "قارئ" : userData?.user?.is_reader === false && language === 'English' ? "Author" : userData?.user?.is_reader === false && language === 'Arabic' ? "كاتب" : ""}</p>
                    </div>

                    <div className={pp}>
                        <p>{language === "English" ? "Age: " : "العمر: "} {userData?.user.age}</p>
                    </div>
                    <div className={pp}>
                        <p>{userData?.user.discriptions}</p>
                    </div>                </div>
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
                                <Input onChange={(e: any) => setDes(e.target.value)} type='text'  placeholder={language === 'English' ? 'info' : 'نبذة'} />
                                <Input onChange={(e: any) => setName(e.target.value)} type='text'  placeholder={language === 'English' ? 'userame' : 'اسم المستخدم'} />
                                <Input onChange={(e: any) => setAge(e.target.value)} type='number' placeholder={language === 'English' ? 'Age' : 'العمر'} />
                                <Input onClick={updateHandler} type='submit' value={language === 'Arabic' ? 'تغيير' : 'Change'} />
                                <SecondaryButton onClick={logoutHandler} style={{ height: '50px', width: '100px', marginTop: "10px" }}>{language === 'Arabic' ? ' تسجيل الخروج ' : 'Logout'} </SecondaryButton>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title=
                            {language === 'English' ? 'My Favorite' : 'مفضلتي'}
                        >
                            <BookCardList type='box' settings={settingsBox}>{booksCardsFavorite}</BookCardList>

                        </Tab>
                        {userData?.user.is_reader === false ? <Tab eventKey="longer-tab" title=
                            {language === 'English' ? 'My Published Books' : 'كتبي المنشورة'}
                        >
                            <BookCardList type='box' settings={settingsBox}>{booksCardsPublished}</BookCardList>

                        </Tab> : ""}

                    </Tabs>
                </div>

            </Container> </div >
    );
}
export default Profile;