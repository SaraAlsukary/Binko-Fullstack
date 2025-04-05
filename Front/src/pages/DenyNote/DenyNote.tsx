import { Button, Input } from '@components/feedback'
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import actDenyBooks from '@store/booksSlice/act/actDenyBook'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const DenyNote = () => {
    const [note, SetNote] = useState('');
    const { id } = useParams();
    const indx = parseInt(id as string);
    const { language } = useAppSelector(state => state.language)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const DenyNote = {
        id: indx,
        note: note
    }
    console.log(DenyNote)
    const denyHandler = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(actDenyBooks(DenyNote))
            .unwrap()
            .then(() => {
                alert('Denied successfully!')
                language === 'English' ? toast.success('Denied successfully!') : toast.success('تم الرفض بنجاح!')

                // navigate(-2)

            })
    }
    return (
        <form onSubmit={denyHandler} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            height: '500px'
        }}>
            <HeadingTitle>{language === 'English' ? "Write Your Note About The Book" : "اكتب ملاحظتك عن الكتاب"}</HeadingTitle>
            <Input style={{
                margin: '20px 0',

            }}
                onChange={(e) => {
                    console.log(e.target.value)
                    SetNote(e.target.value)
                }} type="text" placeholder={language === 'English' ? 'Note' : 'ملاحظة'} />
            <Button
                style={{
                    color: '#000', height: '50px',
                    width: '331px', borderRadius: '16px', backgroundColor: 'var(--secondary-color'
                }}
            >{language === 'English' ? 'Deny' : 'رفض'}</Button>

        </form>
    )
}

export default DenyNote
