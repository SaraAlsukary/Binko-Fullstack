import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

import './RatingShowStars.css'

// import { useAppSelector } from '@hooks/app'


const RatingShowStars = ({ ratingStars, text }: { ratingStars: number, text: string }) => {

    const [ratings, setRatings] = useState(0)
    const [rateColor, setColor] = useState(null)
    useEffect(() => {
        if (ratingStars) {
            setRatings(ratingStars)
        }
    }, [ratingStars])

    return (
        <div className='m-2 mb-4 stars'>
            <span className='starsText'>{text}</span>

            <span className='st'>
                {
                    [...Array(5)].map((star, idx) => {
                        const currentStar = idx + 1
                        return (
                            <label key={idx}>
                                <input className='hide' type="radio" name='ratings' value={ratingStars} />

                                <FaStar size={35}
                                    color={currentStar <= (rateColor || ratings) ? 'yellow' : 'grey'}
                                />
                            </label>
                        )
                    })

                }
            </span>

        </div>
    )
}

export default RatingShowStars
