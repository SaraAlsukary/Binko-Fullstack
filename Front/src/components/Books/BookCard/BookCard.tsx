import { Button } from '@components/feedback';
import styles from './BookCard.module.css';
import { TBooks } from '@customtypes/booksTypes';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/app';
const { pic, text, paraga, info, btnCard, booCard } = styles;
const BookCard = ({ image, description, user, name, file, id }: TBooks) => {
    const navigate = useNavigate();
    const { language } = useAppSelector(state => state.language);

    return (
        <div className={booCard} >
            <div className={pic}>
                <img src={file ? file : image} alt="" crossOrigin='anonymous' />
            </div>
            <div className={text}>
                <div onClick={() => navigate(`${id}`)} className={paraga}>
                    <h3>{name}</h3>
                    <span>{user}</span>
                    <p>{description}</p>
                    <div className={btnCard}>
                        <Button>
                            {language === 'Arabic' ? 'قراءة' : 'Read'}
                        </Button >
                    </div>
                </div>
                <div className={info}>
                    <h3>{name}</h3>
                    <span>{user}</span>
                    <div className={btnCard}>
                        <Button>
                            {language === 'Arabic' ? 'قراءة' : 'Read'}
                        </Button >
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BookCard
