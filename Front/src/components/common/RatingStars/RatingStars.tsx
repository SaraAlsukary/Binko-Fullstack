import { useState } from 'react'
import { FaStar } from 'react-icons/fa'

import './RatingStars.css'
import { useDispatch } from 'react-redux'
import actAddRating from '@store/booksSlice/act/actAddRating'
import { useAppSelector } from '@hooks/app'
import toast from 'react-hot-toast'

const RatingStars = ({ bookId, userId }: { bookId: number, userId: number }) => {
    const { language } = useAppSelector(state => state.language)
    const [ratings, setRatings] = useState(0)
    const [rateColor, setColor] = useState(null)
    const dispatch = useDispatch()
    interface IForm {
        user: number,
        book: number,
        value: number
    }

    const ratingHandler = (currentRating: number) => {
        setRatings(currentRating)
        const formStars: IForm = {
            user: userId,
            book: bookId,
            value: currentRating
        }
      
        dispatch(actAddRating(formStars))
        language === 'English' ? toast.success(' Added Rating successfully! ') : toast.success('تم اضافة التقييم بنجاح !')

    }

    return (
        <div className='m-2 mb-4 stars'>{
            [...Array(5)].map((star, idx) => {

                const currentRating = (idx + 1) * 2;
                return (
                    <label key={idx}>
                        <input className='hide' type="radio" name='ratings' value={currentRating} onClick={
                            () => ratingHandler(currentRating)
                        } />

                        <FaStar size={40}
                            color={currentRating <= (rateColor || ratings) ? 'yellow' : 'grey'}
                        />
                    </label>
                )
            })

        }
        </div>
    )
}

export default RatingStars
