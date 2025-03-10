import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import axios from 'axios';
import ViewUser from './View/View';
import AddUser from './Add/Add';
import EditUser from './Edit/Edit';
import { ConfirmDialog as ConfirmCategory } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Category.css'
import LottieHandler from '@components/feedback/lottieHandler/lottieHandler';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import Lottie from 'lottie-react';
import actDeleteCategory from '@store/categorySlice/act/actDeleteCategory';
type TCategory = {
    name: string,
    name_ar: string,
    file: string
}
type TCategoryAra = {
    الاسم: string,
    الاسم_العربي: React.ReactNode,
    الملف: string
}
function Category({ rend }: { rend: boolean }) {
    const { language } = useAppSelector(state => state.language);
    const { categories } = useAppSelector(state => state.categories);
    const [show, setShow] = useState(false);
    const dispatch = useAppDispatch();
    const [users, setUsersList] = useState<TCategory[] | TCategoryAra[]>([]);
    const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null)

    useEffect(() => {
        dispatch(actGetCategories())
    }, []);
    useEffect(() => {
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
            // const category = categories.map((cate) => {
            //     name: cate.name,
            //         name_ar: cate.name_arabic,
            //             file: <Lottie animationData={cate.file} style={{ width: '50px', height: '50px' }} loop={loop} />
            // })
            const category: TCategory[] = categories?.map((cate) => {
                return ({
                    id: cate.id,
                    name: cate.name,
                    name_ar: cate.name_arabic,
                    file: <video width='100' height='100' autoPlay loop >
                        <source src={`http://127.0.0.1:8000${cate.file}`} type="video/webm" />
                    </video>
                    // file: <LottieHandler type={cate.name} loop={true} style={{ width: '50px', height: '50px' }} />

                })
            })
            // const category: TCategory = [{
            //     name: 'Action',
            //     name_ar: 'أكشن',
            //     file: <LottieHandler type='Action' loop={true} style={{ width: '50px', height: '50px' }} />,
            // }, {
            //     name: 'Romance',
            //     name_ar: 'عاطفي',
            //     file: <LottieHandler type='Romance' loop={true} style={{ width: '50px', height: '50px' }} />,
            // }, {
            //     name: 'Poem',
            //     name_ar: 'شعر',
            //     file: <LottieHandler type='Poem' loop={true} style={{ width: '50px', height: '50px' }} />,
            // }]
            // const categoryAra: TCategoryAra = [{
            //     الاسم: 'Action',
            //     الاسم_العربي: 'أكشن',
            //     الملف: <LottieHandler type='Action' loop={true} style={{ width: '50px', height: '50px' }} />,
            // }, {
            //     الاسم: 'Romance',
            //     الاسم_العربي: 'عاطفي',
            //     الملف: <LottieHandler type='Romance' loop={true} style={{ width: '50px', height: '50px' }} />,
            // }, {
            //     الاسم: 'Poem',
            //     الاسم_العربي: 'شعر',
            //     الملف: <LottieHandler type='Poem' loop={true} style={{ width: '50px', height: '50px' }} />,
            // }]
            const categoryAra: TCategoryAra[] = categories?.map((cate) => {
                return ({
                    id: cate.id,
                    الاسم: cate.name,
                    الاسم_العربي: cate.name_arabic,
                    الملف: <video width='100' height='100' autoPlay loop >
                        <source src={`http://127.0.0.1:8000${cate.file}`} type="video/webm" />
                    </video>
                })
            })
            const data = language === 'Arabic' ? categoryAra : category
            setUsersList(data);
        }


        getAllUsers();
    }, [language, rend]);

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
        // const category = categories.map((cate) => {
        //     name: cate.name,
        //         name_ar: cate.name_arabic,
        //             file: <Lottie animationData={cate.file} style={{ width: '50px', height: '50px' }} loop={loop} />
        // })
        const category: TCategory[] = categories?.map((cate) => {
            return ({
                name: cate.name,
                name_ar: cate.name_arabic,
                file: <Lottie animationData={`http://127.0.0.1:8000${cate.file}`} style={{ width: '50px', height: '50px' }} loop={true} />

            })
        })
        // const category: TCategory = [{
        //     name: 'Action',
        //     name_ar: 'أكشن',
        //     file: <LottieHandler type='Action' loop={true} style={{ width: '50px', height: '50px' }} />,
        // }, {
        //     name: 'Romance',
        //     name_ar: 'عاطفي',
        //     file: <LottieHandler type='Romance' loop={true} style={{ width: '50px', height: '50px' }} />,
        // }, {
        //     name: 'Poem',
        //     name_ar: 'شعر',
        //     file: <LottieHandler type='Poem' loop={true} style={{ width: '50px', height: '50px' }} />,
        // }]
        // const categoryAra: TCategoryAra = [{
        //     الاسم: 'Action',
        //     الاسم_العربي: 'أكشن',
        //     الملف: <LottieHandler type='Action' loop={true} style={{ width: '50px', height: '50px' }} />,
        // }, {
        //     الاسم: 'Romance',
        //     الاسم_العربي: 'عاطفي',
        //     الملف: <LottieHandler type='Romance' loop={true} style={{ width: '50px', height: '50px' }} />,
        // }, {
        //     الاسم: 'Poem',
        //     الاسم_العربي: 'شعر',
        //     الملف: <LottieHandler type='Poem' loop={true} style={{ width: '50px', height: '50px' }} />,
        // }]
        const categoryAra: TCategoryAra[] = categories?.map((cate) => {
            return ({
                الاسم: cate.name,
                الاسم_العربي: cate.name_arabic,
                الملف: <Lottie animationData={`http://127.0.0.1:8000${cate.file}`} style={{ width: '50px', height: '50px' }} loop={true} />

            })
        })
        const data = language === 'Arabic' ? categoryAra : category
        setUsersList(data);
    }

    const actionsTemplate = (rowDate: object) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    setSelectedUserId(rowDate)
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
                </button>
            </>
        )
    }

    const deleteUserConfirm = (userId: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف التصنيف' : 'Are you sure you want to delete this category?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => deleteUser(userId)
        });
    }

    const deleteUser = (userId: number) => {
        dispatch(actDeleteCategory(userId)).unwrap().then(() => {
            alert("deleted successfully!");
        })
    }

    return (
        <>
            <div className='users-page'>
                <div className='container'>
                    <h1>
                        {language === 'Arabic' ? 'التصنيفات في النظام' : 'The Categories in the System'}

                    </h1>
                    <h3>
                        {language === 'Arabic' ? 'العمليات على التصنيفات' : 'Operations on Categories'}
                    </h3>
                    <div className='users-list'>
                        <div className='addNewUser'>
                            <button className='btn btn-success d-flex align-items-center' onClick={() => setShowAddMode(true)}>
                                {language === 'Arabic' ? 'اضافة صنف جديد ' : 'Add New Category '}
                                <i className="pi pi-plus"></i>


                            </button>
                        </div>
                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'English' ? "name" : "الاسم"} header={language === 'English' ? "name" : "الاسم"}></Column>
                            <Column field={language === 'English' ? "name_ar" : "الاسم_العربي"} header={language === 'English' ? "name_ar" : "الاسم_العربي"}></Column>
                            <Column field={language === 'English' ? "file" : "الملف"} header={language === 'English' ? "file" : "الملف"}></Column>
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

                <Dialog header="Add New User"
                    visible={showAddMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowAddMode(false)}>

                    <AddUser setUserAdded={() => {
                        setShowAddMode(false);
                        getAllUsers();
                    }} />
                </Dialog>

                <Dialog header="Edit Exist User"
                    visible={showEditMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowEditMode(false)}>

                    <EditUser id={selectedUserId} setUserEdited={() => {
                        setShowEditMode(false);
                        getAllUsers();
                    }} />
                </Dialog>

                {show ? <ConfirmCategory />
                    : ''}
            </div >
        </>
    )
}

export default Category