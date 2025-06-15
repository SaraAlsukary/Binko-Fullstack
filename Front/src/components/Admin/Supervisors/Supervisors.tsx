import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
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
import toast from 'react-hot-toast';
type TCategory = {
    id: Number,
    name: string,
    profile: React.ReactNode | null
    category: string | null
}
type TCategoryAra = {
    id: Number,
    الاسم: string,
    الصورة: React.ReactNode | null,
    الصنف: string | null
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
    }, [language])
    useEffect(() => {
        if (supervisors) {
            const getAllUsers = () => {
                const category: TCategory[] = supervisors.map((user) => {
                    return ({
                        id: user.id,
                        name: user.name,
                        category: user.category,
                        profile: <img src={`http://127.0.0.1:8000${user.image}`} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />

                    })

                })
                const categoryAra: TCategoryAra[] = supervisors.map((user) => {
                    return ({
                        id: user.id,
                        الاسم: user.name,
                        الصنف: user.category,
                        الصورة: <img src={`http://127.0.0.1:8000${user.image}`} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />

                    })
                })
                const data = language === 'Arabic' ? categoryAra : category
                setUsersList(data);



            }
            getAllUsers();
        }
    }, [supervisors]);



    const actionsTemplate = (rowDate: object) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    setSelectedUserId(rowDate?.id)
                    setShowViewMode(true)
                }}>
                    <i className='pi pi-eye'></i>
                </button>
                <button className='btn btn-primary' onClick={() => {
                    setSelectedUserId(rowDate?.id)
                    setShowEditMode(true)
                }}>
                    <i className='pi pi-file-edit'></i>
                </button>
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
            language === 'English' ? toast.success('Deleted Successfully') : toast.success('تم الحذف بنجاح!')

        })
    }

    return (
        <>
            <div className='users-page'>
                <div className='container'>
                    <h1>
                        {language === 'Arabic' ? 'المشرفين في النظام' : 'The Supervisors in the System'}

                    </h1>
                    <h3>
                        {language === 'Arabic' ? 'العمليات على المشرفين' : 'Operations on Supervisors'}
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
                            <Column field={language === 'English' ? "category" : "الصنف"} header={language === 'English' ? "category" : "الصنف"}></Column>

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

                <ConfirmSuper />

            </div>

        </>
    )
}

export default Supervisors