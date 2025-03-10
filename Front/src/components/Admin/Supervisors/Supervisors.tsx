import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import axios from 'axios';
import img from '@assets/imgs/night-adventure-with-fairy-glowing-object-generative-ai_188544-12605.avif'
import img2 from '@assets/imgs/thought-you-guys-might-like-these-ghibli-inspired-library-v0-byeryvq215wb1.webp'
import img3 from '@assets/imgs/illustration-bookshelf-with-books_961004-3667.avif'
import ViewUser from './View/View';
import AddUser from './Add/Add';
import EditUser from './Edit/Edit';
import { ConfirmDialog as ConfirmSuper } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Users.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetSupervisor from '@store/supervisorSlice/act/actGetSupervisor';
import actDeleteUser from '@store/usersSlice/act/actDeleteUser';
type TCategory = {
    id: Number,
    name: string,
    profile: React.ReactNode | null
    bio: string | null
}
type TCategoryAra = {
    id: Number,
    الاسم: string,
    الصورة: React.ReactNode | null,
    الوصف: string | null
}
function Supervisors({ rend }: { rend: boolean }) {
    const { language } = useAppSelector(state => state.language);
    const [show, setShow] = useState(false);
    const { supervisors } = useAppSelector(state => state.supervisors);
    const [users, setUsersList] = useState<TCategory[] | TCategoryAra[]>([]);
    const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null)
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(actGetSupervisor())

    }, [])
    useEffect(() => {
        const getAllUsers = () => {
            const category: TCategory[] = supervisors.map((user) => {
                return ({
                    id: user.id,
                    name: user.name,
                    bio: user.discriptions,
                    profile: <img src={`http://127.0.0.1:8000${user.image}`} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />

                })

            })
            const categoryAra: TCategoryAra[] = supervisors.map((user) => {
                return ({
                    id: user.id,
                    الاسم: user.name,
                    الوصف: user.discriptions,
                    الصورة: <img src={`http://127.0.0.1:8000${user.image}`} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />

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
                    setSelectedUserId(rowDate?.id)
                    setShowViewMode(true)
                }}>
                    <i className='pi pi-eye'></i>
                </button>
                {/* <button className='btn btn-primary' onClick={() => {
                    setSelectedUserId(rowDate?.id)
                    setShowEditMode(true)
                }}>
                    <i className='pi pi-file-edit'></i>
                </button> */}
                <button className='btn btn-danger' onClick={() => {
                    setShow(true)
                    deleteUserConfirm(rowDate?.id)
                }}>
                    <i className='pi pi-trash'></i>
                </button >
            </>
        )
    }

    const deleteUserConfirm = (userId: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف المشرف' : 'Are you sure you want to delete this supervisor?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => deleteUser(userId),
        });
    }

    const deleteUser = async (userId: number) => {
        dispatch(actDeleteUser(userId)).unwrap().then(() => {
            alert('Deleted Successfully')
        })
    }

    return (
        <>
            <div className='users-page'>
                <div className='container'>
                    <h1>
                        {language === 'Arabic' ? 'المستخدمين في النظام' : 'The Users in the System'}

                    </h1>
                    <h3>
                        {language === 'Arabic' ? 'العمليات على المستخدمين' : 'Operations on Users'}
                    </h3>

                    <div className='users-list'>
                        <div className='addNewUser'>
                            <button className='btn btn-success' onClick={() => setShowAddMode(true)}>

                                {language === 'Arabic' ? 'اضافة مشرف جديد ' : 'Add New Supervisor '}
                                <i className='pi pi-plus'></i>
                            </button>
                        </div>
                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'English' ? "profile" : "الصورة"} header={language === 'English' ? "profile" : "الصورة"}></Column>
                            <Column field={language === 'English' ? "name" : "الاسم"} header={language === 'English' ? "name" : "الاسم"}></Column>
                            <Column field={language === 'English' ? "bio" : "الوصف"} header={language === 'English' ? "bio" : "الوصف"}></Column>
                            {/* <Column field="name" header="Name"></Column>
                            <Column field="username" header="Username"></Column>
                            <Column field="email" header="Email Adress"></Column>
                            <Column field="phone" header="Phone Number"></Column>
                            <Column field="website" header="Website"></Column> */}
                            <Column header={language === 'English' ? "Actions" : "العمليات"} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>

                <Dialog header="View Supervisor Data"
                    visible={showViewMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowViewMode(false)}>

                    <ViewUser userId={selectedUserId} />
                </Dialog>

                <Dialog header="Add New Supervisor"
                    visible={showAddMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowAddMode(false)}>

                    <AddUser setUserAdded={() => {
                        setShowAddMode(false);
                    }} />
                </Dialog>

                <Dialog header="Edit Exist Supervisor"
                    visible={showEditMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowEditMode(false)}>

                    <EditUser userId={selectedUserId} setUserEdited={() => {
                        setShowEditMode(false);
                    }} />
                </Dialog>

                {show ? <ConfirmSuper /> : ""}

            </div>
        </>
    )
}

export default Supervisors