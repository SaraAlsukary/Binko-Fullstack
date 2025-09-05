import { useEffect } from 'react';
import style from './UserInfo.module.css';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import BookCard from '@components/Books/BookCard/BookCard';
import { Container, Tab, Tabs } from 'react-bootstrap';
import BookCardList from '@components/Books/BookCardList/BookCardList';
import { Button } from '@components/feedback';
import { useNavigate, useParams } from 'react-router-dom';
import actGetUsers from '@store/usersSlice/act/actGetUsers';
import actGetfavorite from '@store/Favorite/act/actGetfavorite';
import actGetMyBooks from '@store/booksSlice/act/actGetMyBooks';
import { settingsBox } from '@utils/settingsForSlick';
import actGetBooks from '@store/booksSlice/act/actGetBooks';
import { confirmDialog as confirm } from 'primereact/confirmdialog';

import actDeleteUser from '@store/usersSlice/act/actDeleteUser';
import toast from 'react-hot-toast';
import actAcceptUser from '@store/usersSlice/act/actAcceptUser';
import { Localhost } from '@utils/localhost';
import actDenyUser from '@store/usersSlice/act/actDenyUser';
const { profileContainer, settings, userName, pic, img, info } = style;

const UserInfo = () => {

    const { id } = useParams();
    const idx = parseInt(id as string);
    const { users } = useAppSelector(state => state.users);
    const booksFav = useAppSelector(state => state.favorite.books);
    const { myBooks, books } = useAppSelector(state => state.books);
    const { userData } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { language } = useAppSelector(state => state.language);

    const booksCardsFavorite = booksFav.map((book => <BookCard key={book.id} {...book} />))

    const booksPublished = books.filter(book => book.user?.id === idx)

    const booksCardsPublished = booksPublished.map((book => <BookCard key={book?.id} {...book} />))
    const deleteConfirm = () => {
        confirm({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف المستخدم' : 'Are you sure you want to delete this user?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => deleteHandler(),
        });
    }
    const acceptConfirm = () => {
        confirm({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد قبول المستخدم' : 'Are you sure you want to accept this user?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => acceptHandler(),
        });
    }
    const acceptHandler = () => {
        dispatch(actAcceptUser(userInfo?.id!))
            .unwrap().then(() => {
                language === 'English' ? toast.success('user accepted succesfully!') : toast.success('تم قبول المستخدم !')
                navigate(0)
            })
    }
    const deleteHandler = () => {
        dispatch(actDeleteUser(userInfo?.id!))
            .unwrap().then(() => {
                language === 'English' ? toast.success('user deleted succesfully!') : toast.success('تم حذف المستخدم !')

            })

        dispatch(actDenyUser(userInfo?.id!))
            .unwrap().then(() => {
                language === 'English' ? toast.success('user denied succesfully!') : toast.success('تم حظر المستخدم !')
                navigate(-1)

            })
    }
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
                        <img src={`${Localhost}${userInfo?.image}`} alt="" />
                    </div>
                </div>
                <div className={userName}>
                    <h2>{userInfo?.name}</h2>
                </div>
                <div className="reader">
                    <p>{userInfo?.is_reader && language === 'English' ? "Reader" : userInfo?.is_reader && language === 'Arabic' ? "قارئ" : !userInfo?.is_reader && language === 'English' ? "Author" : !userInfo?.is_reader && language === 'Arabic' ? "كاتب" : ""}</p>
                </div>
                <div className="para">
                    <p>{userInfo?.discriptions}</p>
                </div>
                {userData?.user.is_admin && <div className='d-flex justify-content-center'>
                    {!userInfo?.is_accept ? <div className={userName}>
                        <Button onClick={acceptConfirm}>{language === 'Arabic' ? 'قبول' : "Accept"}</Button>
                    </div> : ""}
                    <div className={userName}>
                        <Button onClick={deleteConfirm} style={{ backgroundColor: 'var(--red)', margin: "0 4px" }}>{language === 'Arabic' ? 'حذف' : "Delete"}</Button>
                    </div>
                </div>}

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
                                    {language === "English" ? 'Name:' : 'الاسم:'} {userInfo?.name}
                                </div>
                                <div>
                                    {language === "English" ? 'Bio:' : 'الوصف:'}
                                </div>
                                <div> {userInfo?.discriptions}</div>
                                <div>
                                    {language === "English" ? 'Age:' : 'العمر:'}  {userInfo?.age}
                                </div>
                            </div>
                        </Tab>
                        <Tab eventKey="profile" title=
                            {language === 'English' ? 'Favorite' : 'المفضلة'}
                        >
                            <BookCardList type="box" settings={settingsBox}>{booksCardsFavorite}</BookCardList>

                        </Tab>
                        {!userData?.user.is_reader ?
                            <Tab eventKey="longer-tab" title=
                                {language === 'English' ? 'Published Books' : 'الكتب المنشورة'}
                            >
                                <BookCardList type="box" settings={settingsBox}>{booksCardsPublished}</BookCardList>

                            </Tab> : ""}

                    </Tabs>
                </div>

            </Container> </div >
    );
}

export default UserInfo
