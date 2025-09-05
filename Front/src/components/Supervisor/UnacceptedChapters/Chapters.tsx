import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { confirmDialog } from 'primereact/confirmdialog';
import { Column } from 'primereact/column';
import './Chapters.css'
import { useAppDispatch, useAppSelector } from '@hooks/app';

import { useNavigate } from 'react-router-dom';


import toast from 'react-hot-toast';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
import actGetUnacceptedChapters from '@store/chaptersSlice/act/actGetUnacceptedChapter';
import actDeleteChapters from '@store/chaptersSlice/act/actDeleteChapter';
type TChapters = {
    id: number,
    idBook: number,
    title: string | null,
    nameBook: string | null,
}
type TChaptersAra = {
    id: number,
    idBook: number,
    العنوان: string | null,
    اسم_الكتاب: string | null,
}
function Book() {
    const { language } = useAppSelector(state => state.language);
    const { acceptedchapters, loading, error } = useAppSelector(state => state.chapters);
    const [Chapters, setList] = useState<TChapters[] | TChaptersAra[]>([]);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();


    useEffect(() => {
        dispatch(actGetUnacceptedChapters())

    }, [language]);
    useEffect(() => {
        if (acceptedchapters) {
            const getAll = async () => {
                const chapter: TChapters[] = acceptedchapters.map((ch) => {
                    return ({
                        id: ch.id!,
                        idBook: ch.book,
                        title: ch.title,
                        nameBook: ch.name!,

                    })
                })
                const chapterAra: TChaptersAra[] = acceptedchapters.map((ch) => {
                    return ({
                        id: ch.id!,
                        idBook: ch.book,
                        العنوان: ch.title,
                        اسم_الكتاب: ch.name!,
                    })
                })
                const data = language === 'Arabic' ? chapterAra : chapter
                setList(data);
            }

            getAll();
        }
    }, [acceptedchapters]);

    const actionsTemplate = (rowDate: TChapters | TChaptersAra) => {
        return (
            <>
                <button className='btn btn-success' onClick={() => {
                    navigate(`/Binko/books/${rowDate.idBook}`)

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

    const deleteUserConfirm = (Id: number) => {
        confirmDialog({
            message: language === 'Arabic' ? 'هل أنتَ متأكد من أنك تريد حذف الفصل؟' : 'Are you sure you want to delete this chapter?',
            header: language === 'English' ? 'Confirmation' : "التأكيد",
            icon: 'pi pi-trash',
            acceptLabel: language === 'English' ? 'Yes' : "نعم",
            rejectLabel: language === 'English' ? 'No' : " لا",
            accept: () => {
                deleteHandler(Id)
            },
        });
    }

    const deleteHandler = (Id: number) => {
        dispatch(actDeleteChapters(Id)).unwrap().then(() => {
            language === 'English' ? toast.success(' Deleted successfully! ') : toast.success('تم الحذف بنجاح !')

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
                        {language === 'English' ? ' Unaccepted Chapters in the System' : 'الفصول في النظام'}
                    </h1>
                    <h3>
                        {language === 'English' ? 'Operations on Unaccepted Chapters' : ' التعديلات على الفصول '}
                    </h3>

                    <div className='users-list'>

                        <DataTable className='tableCell' value={Chapters}>
                            <Column field={language === 'English' ? 'title' : 'العنوان'} header={language === 'English' ? 'title' : 'العنوان'}></Column>
                            <Column field={language === 'English' ? 'nameBook' : 'اسم_الكتاب'} header={language === 'English' ? 'Book Name' : 'اسم_الكتاب'}></Column>

                            <Column header={language === 'Arabic' ? 'العمليات' : 'Actions'} body={actionsTemplate}></Column>
                        </DataTable>
                    </div>
                </div>







            </div>
        </>
    )
}

export default Book