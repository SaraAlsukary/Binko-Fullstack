import styles from './BookCardSquare.module.css';
import { Button } from '@components/feedback';
import { TBooks } from '@customtypes/booksTypes';
import { useAppSelector } from '@hooks/app';
import { useNavigate } from 'react-router-dom';
const { pic, text, booCard } = styles

const BookCardSquare = ({ image, description, user, name, id }: TBooks) => {
    const navigate = useNavigate();
    const { language } = useAppSelector(state => state.language);
    return (
        <div onClick={() => navigate(`${id}`)} className={booCard} >
            <div className={pic}>
                <img src={`http://127.0.0.1:8000${image}`} alt="" crossOrigin='anonymous' />
            </div>
            <div className={text}>
                <h3>{name}</h3>
                <span>{user?.name}</span>
                <p>{description}</p>
                <Button>
                    {language === 'Arabic' ? 'قراءة' : 'Read'}
                </Button >
            </div>
        </div>
    )
}

export default BookCardSquare
