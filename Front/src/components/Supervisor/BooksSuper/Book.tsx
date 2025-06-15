import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';



import { ConfirmDialog } from 'primereact/confirmdialog';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';

import './Book.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { useNavigate } from 'react-router-dom';

import actDeleteBook from '@store/booksSlice/act/actDeleteBooks';
import toast from 'react-hot-toast';
import actGetBooksBySuperCate from '@store/booksSlice/act/actGetBooksBySuperCate';
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
function Book() {
    
    const { language } = useAppSelector(state => state.language);
    const { userData } = useAppSelector(state => state.auth);
    const { books } = useAppSelector(state => state.books);
    const booksUser = useAppSelector(state => state.users.users);
    const [users, setUsersList] = useState<TCategory[] | TCategoryAra[]>([]);

    const dispatch = useAppDispatch();
  
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(actGetBooksBySuperCate(userData?.user.id))
    }, [language]);
    useEffect(() => {
        if (books) {
            const getAllUsers = async () => {
                const category: TCategory[] = books.map((book) => {
                    return ({
                        id: book.id,
                        name: book.name,
                        author: booksUser.find((user) => user.id === book.user)?.name,
                        Image: <img src={`http://127.0.0.1:8000${book.image}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,

                    })
                })
                const categoryAra: TCategoryAra[] = books.map((book) => {
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
        }
    }, [books]);
    const actionsTemplate = (rowDate: object) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    navigate(`/Binko/books/${rowDate.id}`)
                  
                }}>
                    <i className='pi pi-eye'></i>
                </button>
               
                <button className='btn btn-danger' onClick={() => {
             

                    deleteUserConfirm(rowDate?.id)
                }

                }>
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
                deleteUser(userId)
            },
        });
    }

    const deleteUser = (userId: number) => {
        dispatch(actDeleteBook(userId)).unwrap().then(() => {
            language === 'English' ? toast.success(' Deleted successfully! ') : toast.success('تم الحذف بنجاح !')

            navigate(`/Binko/admin`)
        })
    }

    return (
        <>
            <div className='users-page'>
                <div className='container'>
                    <h1>
                        {language === 'English' ? `The Books in the System with Supervisor Category` : 'الكتب في النظام بتصنيف المشرف'}
                    </h1>
                    <h3>
                        {language === 'English' ? 'Operations on Books' : ' التعديلات على الكتب '}
                    </h3>

                    <div className='users-list'>
                        
                        <DataTable className='tableCell' value={users}>
                            <Column field={language === 'English' ? 'Image' : 'الصورة'}
                                header={language === 'English' ? 'Image' : 'الصورة'}></Column>
                            <Column field={language === 'English' ? 'name' : 'الاسم'} header={language === 'English' ? 'name' : 'الاسم'}></Column>
                            <Column field={language === 'English' ? 'author' : 'الكاتب'} header={language === 'English' ? 'author' : 'الكاتب'}></Column>
                      
                            <Column header={language === 'Arabic' ? 'العمليات' : 'Actions'} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>

             
         

              
                    <ConfirmDialog />
                  
            </div>
        </>
    )
}

export default Book