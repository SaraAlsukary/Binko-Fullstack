import { useEffect, useState } from 'react'
import { Rate } from 'antd';
import './RatingShowStars.css'
const RatingShowStars = ({ ratingStars }: { ratingStars: number }) => {

    const [ratings, setRatings] = useState(0)
    useEffect(() => {
        if (ratingStars) {
            setRatings(ratingStars)
        }
    }, [ratingStars])
    return (
        <div className='m-2 mb-4 stars d-flex align-items-center justify-content-center'>
            <Rate allowHalf disabled defaultValue={0} value={ratings} count={5} />
        </div>
    )
}

export default RatingShowStars
