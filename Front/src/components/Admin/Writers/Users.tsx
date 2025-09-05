import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { confirmDialog as confirm } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import './Users.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actDeleteUser from '@store/usersSlice/act/actDeleteUser';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
import actGetWriters from '@store/usersSlice/act/actGetWriters';
import { Localhost } from '@utils/localhost';
type TUser = {
    id: number,
    name: string | null,
    profile: React.ReactNode,
    bio: string | null
};
type TUserAra = {
    id: number,
    الاسم: string | null,
    الصورة: React.ReactNode,
    الوصف: string | null
};
function Comment() {
    const { language } = useAppSelector(state => state.language);
    const { loading, error, writers } = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();
    const [users, setUsersList] = useState<TUser[] | TUserAra[]>([]);
    useEffect(() => {
        dispatch(actGetWriters())
    }, [language])
    useEffect(() => {
        if (writers) {
            const getAllUsers = () => {
                const user: TUser[] = writers.map((user) => {
                    return ({
                        id: user.id!,
                        name: user.name!,
                        bio: user.discriptions,
                        profile: <img src={`${Localhost}${user.image}`} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />

                    })

                })
                const userAra: TUserAra[] = writers.map((user) => {
                    return ({
                        id: user.id!,
                        الاسم: user.name!,
                        الوصف: user.discriptions,
                        الصورة: <img src={`${Localhost}${user.image}`} style={{ marginTop: '10px', width: '50px', height: '50px', borderRadius: '50%' }} />

                    })
                })
                const data = language === 'Arabic' ? userAra : user
                setUsersList(data);



            }
            getAllUsers();
        }
    }, [writers]);

    const navigate = useNavigate();


    const actionsTemplate = (rowDate: TUser | TUserAra) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    // setSelectedUserId(rowDate?.id)
                    navigate(`/Binko/userInfo/${rowDate.id}`)
                    // setShowViewMode(true)
                }}>
                    <i className='pi pi-eye'></i>
                </button>

                <button className='btn btn-danger' onClick={() => {
                    deleteConfirm(rowDate?.id)
                }}>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        )
    }


    const deleteConfirm = (userId: number) => {
        confirm({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف المستخدم' : 'Are you sure you want to delete this user?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => deleteUser(userId),
        });
    }

    const deleteUser = (userId: number) => {
        dispatch(actDeleteUser(userId))
            .unwrap().then(() => {
                language === 'English' ? toast.success('user deleted succesfully!') : toast.success('تم حذف المستخدم !')

            })
    }
    if (loading === 'pending')
        return <Loading />
    if (error !== null)
        return <Error />
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

                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'English' ? "profile" : "الصورة"} header={language === 'English' ? "profile" : "الصورة"}></Column>
                            <Column field={language === 'English' ? "name" : "الاسم"} header={language === 'English' ? "name" : "الاسم"}></Column>
                            <Column field={language === 'English' ? "bio" : "الوصف"} header={language === 'English' ? "bio" : "الوصف"}></Column>
                            <Column header={language === 'English' ? "Actions" : "العمليات"} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>



            </div>
        </>
    )
}

export default Comment