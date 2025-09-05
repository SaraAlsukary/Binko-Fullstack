import { TNotification } from '@customtypes/notificationType'
import './NotificationCard.css'
import { useAppSelector } from '@hooks/app'
import { useNavigate } from 'react-router-dom'
import { Localhost } from '@utils/localhost'


const NotificationCard = ({ chapter_title, book_id, book_image, chapter_id, book_title, message_ar, message_en, id, created_at, is_read }: TNotification) => {
    const { language } = useAppSelector(state => state.language)
    const navigate = useNavigate()
    return (
        <div className="notifyCard" onClick={() => navigate(`/Binko/books/${book_id}`)}>
            <div className="image">
                <img src={`${Localhost}${book_image}`} alt="" />
            </div>
            <div className="text">
                <div className="title">
                    {book_title}
                </div>
                <div className="message">{language === 'English' ? message_en : message_ar}</div>
            </div>
        </div>
    )
}

export default NotificationCard