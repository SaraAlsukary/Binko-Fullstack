import { Button } from '@components/feedback';
import styles from './BookCard.module.css';
import { TBooks } from '@customtypes/booksTypes';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@hooks/app';
import { Localhost } from '@utils/localhost';
const { pic, text, paraga, info, btnCard, booCard } = styles;
const BookCard = ({ image, description, user, name, id, path }: TBooks) => {
    const navigate = useNavigate();
    const { language } = useAppSelector(state => state.language);
    const chars = (description: string) => {
        var des = ''
        for (let index = 0; index < description?.length && index < 300; index++) {
            const element = description[index];
            des += element
        }
        des += '...'
        return des
    }
    const desc = chars(description as string)

    return (
        <div className={booCard}  >
            <div className={pic}>
                <img src={`${Localhost}${image}`} alt="" crossOrigin='anonymous' />
            </div>
            <div className={text}>
                <div onClick={() => navigate(path ? `${path}${id}` : `/Binko/books/${id}`)} className={paraga}>
                    <h3>{name}</h3>
                    <span>{user?.name}</span>
                    <p>{desc}</p>
                    <div className={btnCard}>
                        <Button>
                            {language === 'Arabic' ? 'قراءة' : 'Read'}
                        </Button >
                    </div>
                </div>
                <div className={info}>
                    <h3>{name}</h3>
                    <span>{user?.name}</span>
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
