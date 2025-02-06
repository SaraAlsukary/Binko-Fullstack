import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import axios from 'axios';
import img from '@assets/imgs/night-adventure-with-fairy-glowing-object-generative-ai_188544-12605.avif'
import img2 from '@assets/imgs/thought-you-guys-might-like-these-ghibli-inspired-library-v0-byeryvq215wb1.webp'
import img3 from '@assets/imgs/illustration-bookshelf-with-books_961004-3667.avif'
import ViewUser from './View/View';
import AddUser from './Add/Add';
import EditUser from './Edit/Edit';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Comment.css'
import { useAppSelector } from '@hooks/app';
type TCategory = {
    name: string,
    profile: React.ReactNode,
    comment: string
}
type TCategoryAra = {
    الاسم: string,
    الصورة: React.ReactNode,
    التعليق: string
}
function Comment() {
    const { language } = useAppSelector(state => state.language);

    const [users, setUsersList] = useState([]);
    const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null)

    useEffect(() => {
        getAllUsers();
    }, [language]);


    const getAllUsers = async () => {
        // try {
        //     const response = await axios.get('http://localhost:4000/users');
        //     if (response) {
        //         setUsersList(response.data);
        //     }
        // }
        // catch (e) {
        //     console.log(e)
        // }
        const category: TCategory = [{
            name: 'Sara',
            comment: 'It is a good book!',
            profile: <img src={img} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />,
        }, {
            name: 'Noor',
            comment: 'What a boring writes!',
            profile: <img src={img2} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />,

        }, {
            name: 'Alaa',
            comment: 'Beautiful, it is a useful book',
            profile: <img src={img3} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />,

        }]
        const categoryAra: TCategoryAra = [{
            الاسم: 'Sara',
            التعليق: 'It is a good book!',
            الصورة: <img src={img} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />,
        }, {
            الاسم: 'Noor',
            التعليق: 'What a boring writes!',
            الصورة: <img src={img2} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />,

        }, {
            الاسم: 'Alaa',
            التعليق: 'Beautiful, it is a useful book',
            الصورة: <img src={img3} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />,

        }]
        const data = language === 'Arabic' ? categoryAra : category

        setUsersList(data);
    }

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
                <button className='btn btn-danger' onClick={() => deleteUserConfirm(rowDate?.id)}>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        )
    }

    const deleteUserConfirm = (userId: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف التعليق؟' : 'Are you sure you want to delete this comment?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => deleteUser(userId),
        });
    }

    const deleteUser = async (userId: number) => {
        try {
            const response = await axios.delete('http://localhost:4000/users/' + userId);
            if (response) {
                getAllUsers();
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className='users-page'>
                <div className='container'>
                    <h1>
                        {language === 'Arabic' ? 'التعليقات في النظام' : 'The Comments in the System'}

                    </h1>
                    <h3>
                        {language === 'Arabic' ? 'العمليات على التعليقات' : 'Operations on Comments'}
                    </h3>

                    <div className='users-list'>
                        {/* <div className='addNewUser'>
                            <button className='btn btn-success' onClick={() => setShowAddMode(true)}>
                                Add New User <i className='pi pi-plus'></i>
                            </button>
                        </div> */}
                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'English' ? "profile" : "الصورة"} header={language === 'English' ? "profile" : "الصورة"}></Column>
                            <Column field={language === 'English' ? "name" : "الاسم"} header={language === 'English' ? "name" : "الاسم"}></Column>
                            <Column field={language === 'English' ? "comment" : "التعليق"} header={language === 'English' ? "comment" : "التعليق"}></Column>
                            {/* <Column field="name" header="Name"></Column>
                            <Column field="username" header="Username"></Column>
                            <Column field="email" header="Email Adress"></Column>
                            <Column field="phone" header="Phone Number"></Column>
                            <Column field="website" header="Website"></Column> */}
                            <Column header={language === 'English' ? "Actions" : "العمليات"} body={actionsTemplate}></Column>
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

                <ConfirmDialog />

            </div>
        </>
    )
}

export default Comment