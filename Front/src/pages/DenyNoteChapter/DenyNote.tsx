import { Button, Input } from '@components/feedback'
import HeadingTitle from '@components/feedback/HeadingTitle/HeadingTitle'
import { useAppDispatch, useAppSelector } from '@hooks/app'
import actDenyChapters from '@store/chaptersSlice/act/actDenyChapter'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
type TNote = {
    id: number,
    note: string
}
const DenyNote = () => {
    const [note, SetNote] = useState('');
    const { idChapter } = useParams();
    const indx = parseInt(idChapter as string);
    const { language } = useAppSelector(state => state.language)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const denyHandler = (e: React.FormEvent) => {
        e.preventDefault();
        const DenyNote: TNote = {
            id: indx,
            note: note
        }
        dispatch(actDenyChapters(DenyNote)).unwrap().then(() => {
            alert('Denied successfully!')
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
            <HeadingTitle>{language === 'English' ? "Write Your Note About The Chapter" : "اكتب ملاحظتك عن الفصل"}</HeadingTitle>
            <Input style={{
                margin: '20px 0',

            }}
                onChange={(e) => SetNote(e.target.value)} type="text" placeholder={language === 'English' ? 'Note' : 'ملاحظة'} />
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
