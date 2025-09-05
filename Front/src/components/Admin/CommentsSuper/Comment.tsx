import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';

import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';

import './Comment.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import actGetComments from '@store/commentsSlice/act/actGetComments';
import actDeleteComment from '@store/commentsSlice/act/actDeleteComment';
import { useNavigate } from 'react-router-dom';
import actGetBooks from '@store/booksSlice/act/actGetBooks';
import actGetBooksToAccept from '@store/booksSlice/act/actGetBooksToAccept';
import toast from 'react-hot-toast';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
import { Localhost } from '@utils/localhost';
type TComment = {
    id: number,
    name: string,
    book: string,
    book_id: number,
    profile: React.ReactNode,
    comment: string
}
type TCommentAra = {
    id: number,
    book_id: number,
    الاسم: string,
    الكتاب: string,
    الصورة: React.ReactNode,
    التعليق: string
}
function Comment() {
    const { language } = useAppSelector(state => state.language);

    const [Comments, setList] = useState<TComment[] | TCommentAra[]>([]);


    const { comments, loading, error } = useAppSelector(state => state.comments)
    const { books, acceptedBooks } = useAppSelector(state => state.books)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actGetComments());
        dispatch(actGetBooks());
        dispatch(actGetBooksToAccept());
    }, [language]);
    useEffect(() => {
        if (comments) {
            const getAll = () => {

                const comment: TComment[] = comments.map((comment) => {


                    const book = acceptedBooks.find(book => book.name === comment.book) ? acceptedBooks.find(book => book.name === comment.book) : books.find(book => book.name === comment.book)
                    return ({
                        id: comment.id!,
                        book_id: book?.id!,
                        book: book?.name!,
                        name: comment.name!,
                        comment: comment.comment!,
                        profile: <img src={`${Localhost}${comment.image!}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />,
                    })
                })
                const commentAra: TCommentAra[] = comments.map((comment) => {
                    const bookId = acceptedBooks.find(book => book.name == comment.book) ? acceptedBooks.find(book => book.name === comment.book) : books.find(book => book.name === comment.book)
                    return ({
                        id: comment.id!,
                        book_id: bookId?.id!,
                        الكتاب: bookId?.name!,
                        الاسم: comment.name!,
                        التعليق: comment.comment!,
                        الصورة: <img src={`${Localhost}${comment.image!}`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />,
                    })
                })

                const data = language === 'Arabic' ? commentAra : comment

                setList(data);
            }
            getAll();
        }
    }, [comments]);


    const actionsTemplate = (rowDate: TComment | TCommentAra) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    navigate(`/Binko/books/${rowDate.id}`)

                }}>
                    <i className='pi pi-eye'></i>
                </button>

                <button className='btn btn-danger' onClick={() => {
                    deleteUserConfirm(rowDate?.id)
                }}>
                    <i className='pi pi-trash'></i>
                </button>
            </>
        )
    }

    const deleteUserConfirm = (Id: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف التعليق؟' : 'Are you sure you want to delete this comment?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => deleteHandler(Id),
        });
    }

    const deleteHandler = async (Id: number) => {
        dispatch(actDeleteComment(Id)).unwrap().then(() => {
            language === 'English' ? toast.success('deleted successfully!') : toast.success('تم الحذف بنجاح')
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
                        {language === 'Arabic' ? 'التعليقات في النظام' : 'The Comments in the System'}

                    </h1>
                    <h3>
                        {language === 'Arabic' ? 'العمليات على التعليقات' : 'Operations on Comments'}
                    </h3>

                    <div className='users-list'>

                        <DataTable className='tableCell' value={Comments}>
                            <Column field={language === 'English' ? "profile" : "الصورة"} header={language === 'English' ? "profile" : "الصورة"}></Column>
                            <Column field={language === 'English' ? "name" : "الاسم"} header={language === 'English' ? "name" : "الاسم"}></Column>
                            <Column field={language === 'English' ? "book" : "الكتاب"} header={language === 'English' ? "book" : "الكتاب"}></Column>
                            <Column field={language === 'English' ? "comment" : "التعليق"} header={language === 'English' ? "comment" : "التعليق"}></Column>
                            <Column header={language === 'English' ? "Actions" : "العمليات"} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Comment