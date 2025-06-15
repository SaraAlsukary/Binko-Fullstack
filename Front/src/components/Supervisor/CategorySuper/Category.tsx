import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import ViewUser from './View/View';
import AddUser from './Add/Add';
import EditUser from './Edit/Edit';
import { ConfirmDialog as ConfirmCategory } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import './Category.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import actDeleteCategory from '@store/categorySlice/act/actDeleteCategory';
import toast from 'react-hot-toast';
type TCategory = {
    id:number,
    name: string,
    name_ar: string,
    file: React.ReactNode
}
type TCategoryAra = {
    id:number,
    الاسم: string,
    الاسم_العربي: string,
    الملف: React.ReactNode
}
function Category() {
    const { language } = useAppSelector(state => state.language);
    const { categories } = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();
    const [users, setUsersList] = useState<TCategory[] | TCategoryAra[]>([]);
    const [showViewMode, setShowViewMode] = useState(false);
    const [showAddMode, setShowAddMode] = useState(false);
    const [showEditMode, setShowEditMode] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null)

    useEffect(() => {
        dispatch(actGetCategories())
    }, [language]);
    useEffect(() => {
        if(categories)
        {           
            const getAllUsers = async () => {
     
            const category: TCategory[] = categories?.map((cate) => {
                return ({
                    id: cate.id,
                    name: cate.name,
                    name_ar: cate.name_arabic,
                    file: <video width='100' height='100' autoPlay loop >
                        <source src={`http://127.0.0.1:8000${cate.file}`} type="video/webm" />
                    </video>

                }) 
            })
   
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
        }
    }, [categories]);

 
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
            language === 'English' ? toast.success(' Deleted successfully! ') : toast.success('تم الحذف بنجاح !')
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
                     
                            <Column header={language === 'English' ? "Actions" : "العمليات"} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>

                <Dialog header={language==="English"?"View Category Data":"عرض بيانات الصنف"}
                    visible={showViewMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowViewMode(false)}>

                    <ViewUser id={selectedUserId} />
                </Dialog>

                <Dialog header={language === "English" ? "Add New Category" : "اضافة صنف"}
                    visible={showAddMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowAddMode(false)}>

                    <AddUser setUserAdded={() => {
                        setShowAddMode(false);
                    }} />
                </Dialog>

                <Dialog header={language === "English" ? "Edit Exist Category" : "تعديل صنف موجود"}
                    visible={showEditMode}
                    style={{ width: '70vw' }}
                    onHide={() => setShowEditMode(false)}>

                    <EditUser id={selectedUserId} setUserEdited={() => {
                        setShowEditMode(false);
                      
                    }} />
                </Dialog>

                    <ConfirmCategory />
            </div >
        </>
    )
}

export default Category