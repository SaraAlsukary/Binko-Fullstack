import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';

import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';

import './Book.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import { useNavigate } from 'react-router-dom';
import actGetBooksToAccept from '@store/booksSlice/act/actGetBooksToAccept';

import toast from 'react-hot-toast';
import actDeleteBook from '@store/booksSlice/act/actDeleteBooks';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
import { Localhost } from '@utils/localhost';
type TBook = {
    id: number,
    name: string | null,
    Image: React.ReactNode,
}
type TBookAra = {
    id: number,
    الاسم: string | null,
    الصورة: React.ReactNode,
}
function Book() {

    const { language } = useAppSelector(state => state.language);
    const { acceptedBooks, loading,error } = useAppSelector(state => state.books);
    const [Books, setList] = useState<TBook[] | TBookAra[]>([]);
   

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        dispatch(actGetBooksToAccept())
    }, [language]);
    useEffect(() => {
        if (acceptedBooks) {
            const getAll = async () => {
                const book: TBook[] = acceptedBooks?.map((book) => {
                    return ({
                        id: book.id!,
                        name: book.name!,
                        Image: <img src={`${Localhost}${book.image!}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,

                    })
                })
                const bookAra: TBookAra[] = acceptedBooks?.map((book) => {
                    return ({
                        id: book.id!,
                        الاسم: book.name!,
                        الصورة: <img src={`${Localhost}${book.image!}`} style={{ marginTop: '10px', width: '50px', height: '50px' }} />,

                    })
                })
                const data = language === 'Arabic' ? bookAra : book
                setList(data);
            }

            getAll();
        }
    }, [acceptedBooks]);

    const actionsTemplate = (rowDate: TBook|TBookAra) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    navigate(`/Binko/books/${rowDate.id}`)
             
                }}>
                    <i className='pi pi-eye'></i>
                </button>
         
                <button className='btn btn-danger' onClick={() => deleteConfirm(rowDate?.id)}>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        )
    }

    const deleteConfirm = (Id: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف الكتاب؟' : 'Are you sure you want to delete this book?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => {
                deleteHandler(Id)
            },
        });
    }

    const deleteHandler = async (Id: number) => {

        dispatch(actDeleteBook(Id)).unwrap().then(() => {
            language === 'English' ? toast.success(' Deleted successfully! ') : toast.success('تم الحذف بنجاح !')

            navigate(0)
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
                        {language === 'English' ? 'The Books in the System' : 'الكتب في النظام'}
                    </h1>
                    <h3>
                        {language === 'English' ? 'Operations on Books' : ' التعديلات على الكتب '}
                    </h3>

                    <div className='users-list'>
                 
                        <DataTable className='tableCell' value={Books}>
                            <Column field={language === 'English' ? 'Image' : 'الصورة'}
                                header={language === 'English' ? 'Image' : 'الصورة'}></Column>
                            <Column field={language === 'English' ? 'name' : 'الاسم'} header={language === 'English' ? 'name' : 'الاسم'}></Column>
                 
                            <Column header={language === 'Arabic' ? 'العمليات' : 'Actions'} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>
              
                
             
            </div>
        </>
    )
}

export default Book