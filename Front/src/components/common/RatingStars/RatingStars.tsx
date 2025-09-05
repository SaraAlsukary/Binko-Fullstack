import { useState } from 'react'

import './RatingStars.css'
import { useDispatch } from 'react-redux'
import actAddRating from '@store/booksSlice/act/actAddRating'
import { useAppSelector } from '@hooks/app'
import toast from 'react-hot-toast'
import { Rate } from 'antd'

const RatingStars = ({ bookId, userId, confirm }: { bookId: number, userId: number, confirm: () => void }) => {
    const { language } = useAppSelector(state => state.language)
    const { userData } = useAppSelector(state => state.auth)
    const [ratings, setRatings] = useState(0)
    const dispatch = useDispatch()
    interface IForm {
        user: number,
        book: number,
        value: number
    }

    const ratingHandler = (e: number) => {
        console.log(e)
        if (userData) {
            setRatings(e)
            const formStars: IForm = {
                user: userId,
                book: bookId,
                value: e
            }
            if (formStars.value) {
                dispatch(actAddRating(formStars))
                language === 'English' ? toast.success(' Added Rating successfully! ') : toast.success('تم اضافة التقييم بنجاح !')

            }

        } else {
            confirm()
        }
    }

    return (
        <div className='m-2 mb-4 stars starsModal d-flex align-items-center justify-content-center'>
            <Rate allowHalf defaultValue={0} count={5} onChange={(e) => ratingHandler(e)} />
        </div>
    )
}

export default RatingStars
