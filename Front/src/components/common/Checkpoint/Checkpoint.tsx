import { useAppDispatch, useAppSelector } from '@hooks/app'
import './Checkpoint.css'
import { useEffect } from 'react'
import actShowBook from '@store/checkpoint/act/actShowBook'
import { useNavigate } from 'react-router-dom'
import { Localhost } from '@utils/localhost'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { clearCheckpoint } from '@store/checkpoint/checkpoint'
const Checkpoint = () => {
    const { book, chapter, checkpoint } = useAppSelector(state => state.checkpoint)
    const { language } = useAppSelector(state => state.language)
    const bookContent = useAppSelector(state => state.checkpoint.bookInfo)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goHandler = () => {
        navigate(`/Binko/books/${book}/${chapter}`)
    }
    const closeHandler = () => {
        dispatch(clearCheckpoint())
    }
    useEffect(() => {
        if (checkpoint)
            dispatch(actShowBook(book!))
    }, [book, checkpoint])
    return (<>
        {checkpoint &&
            <div className='checkpoint'>
                <div onClick={goHandler} className='content'>
                    <div className="image">
                        <img src={`${Localhost}${bookContent?.image}`} alt="" width={100} height={130} />
                    </div>
                    <div className="text">
                        <h2>{language === 'English' ? "Continue Reading" : "اكمل القراءة حيث توقفت"}</h2>
                        <h2>{bookContent?.name}</h2>
                        <p>{bookContent?.user?.name}</p>
                    </div>
                </div>
                <AiOutlineCloseCircle onClick={closeHandler} className='icon' width={"200px"} height={"200px"} color='var(--red)' />
            </div>}
    </>
    )
}

export default Checkpoint