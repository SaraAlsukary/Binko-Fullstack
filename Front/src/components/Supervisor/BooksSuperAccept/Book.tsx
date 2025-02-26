import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import axios from 'axios';
import img from '@assets/imgs/books/Les misrables.jpg'
import img2 from '@assets/imgs/books/الجريمة والعقاب.jpg'
import ViewUser from './View/View';
import AddUser from './Add/Add';
import EditUser from './Edit/Edit';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Book.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetBooks from '@store/booksSlice/act/actGetBooks';
import { useNavigate } from 'react-router-dom';
import actGetBooksToAccept from '@store/booksSlice/act/actGetBooksToAccept';
import { TBooks } from '@customtypes/booksTypes';
type TCategory = {
    id: Number,
    name: string | null,
    Image: React.ReactNode,
    author: string | null
}
type TCategoryAra = {
    id: Number,
    الاسم: string | null,
    الصورة: React.ReactNode,
    الكاتب: string | null
}
function Book({ rend }: { rend: boolean }) {
    const [show, setShow] = useState(false);
    const { language } = useAppSelector(state => state.language);
    const { acceptedBooks } = useAppSelector(state => state.books);
    const booksUser = useAppSelector(state => state.users.users);
    const [users, setUsersList] = useState<TCategory[] | TCategoryAra[]>([]);
    const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(actGetBooksToAccept())
    }, [])
    useEffect(() => {

        const getAllUsers = async () => {
            const category: TCategory[] = acceptedBooks?.map((book) => {
                return ({
                    id: book.id,
                    name: book.name,
                    author: booksUser.find((user) => user.id === book.user)?.name,
                    Image: <img src={`http://127.0.0.1:8000${book.image}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,

                })
            })
            const categoryAra: TCategoryAra[] = acceptedBooks?.map((book) => {
                return ({
                    id: book.id,
                    الاسم: book.name,
                    الكاتب: booksUser.find((user) => user.id === book.user)?.name,
                    الصورة: <img src={`http://127.0.0.1:8000${book.image}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,

                })
            })
            const data = language === 'Arabic' ? categoryAra : category
            setUsersList(data);
        }

        getAllUsers();
    }, [language, rend]);


    const actionsTemplate = (rowDate: object) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    navigate(`/Binko/acceptedBook/${rowDate.id}`)
                    // setSelectedUserId(rowDate?.id)
                    // setShowViewMode(true)
                }}>
                    <i className='pi pi-eye'></i>
                </button>
                {/* <button className='btn btn-primary' onClick={() => {
                    setSelectedUserId(rowDate?.id)
                    setShowEditMode(true)
                }}>
                    <i className='pi pi-file-edit'></i>
                </button> */}
                <button className='btn btn-danger' onClick={() => deleteUserConfirm(rowDate?.id)}>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        )
    }

    const deleteUserConfirm = (userId: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف الكتاب؟' : 'Are you sure you want to delete this book?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => {
                setShow(true)
                deleteUser(userId)
            },
        });
    }

    const deleteUser = async (userId: number) => {
        // try {
        //     const response = await axios.delete('http://localhost:4000/users/' + userId);
        //     if (response) {
        //         getAllUsers();
        //     }
        // }
        // catch (e) {
        //     console.log(e)
        // }
    }

    return (
        <>
            <div className='users-page'>
                <div className='container'>
                    <h1>
                        {language === 'English' ? 'The Books in the System' : 'الكتب في النظام'}
                    </h1>
                    <h3>
                        {language === 'English' ? 'Operations on Books' : ' التعديلات على الكتب '}
                    </h3>

                    <div className='users-list'>
                        {/* <div className='addNewUser'>
                            <button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                                Add New User <i className='pi pi-plus'></i>
                            </button>
                        </div> */}
                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'English' ? 'Image' : 'الصورة'}
                                header={language === 'English' ? 'Image' : 'الصورة'}></Column>
                            <Column field={language === 'English' ? 'name' : 'الاسم'} header={language === 'English' ? 'name' : 'الاسم'}></Column>
                            <Column field={language === 'English' ? 'author' : 'الكاتب'} header={language === 'English' ? 'author' : 'الكاتب'}></Column>
                            {/* <Column field="name" header="Name"></Column>
                            <Column field="username" header="Username"></Column>
                            <Column field="email" header="Email Adress"></Column>
                            <Column field="phone" header="Phone Number"></Column>
                            <Column field="website" header="Website"></Column> */}
                            <Column header={language === 'Arabic' ? 'العمليات' : 'Actions'} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>

                <Dialog header="View User Data"
                    visible={showViewMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowViewMode(false)}>

                    <ViewUser userId={selectedUserId} />
                </Dialog>

                {/* <Dialog header="Add New User"
                    visible={showAddMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowAddMode(false)}>

                    <AddUser setUserAdded={() => {
                        setShowAddMode(false);
                        getAllUsers();
                    }} />
                </Dialog> */}

                {/* <Dialog header="Edit Exist User"
                    visible={showEditMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowEditMode(false)}>

                    <EditUser userId={selectedUserId} setUserEdited={() => {
                        setShowEditMode(false);
                        getAllUsers();
                    }} />
                </Dialog> */}

                {show ?
                    <ConfirmDialog />
                    : ""
                }
            </div>
        </>
    )
}

export default Book