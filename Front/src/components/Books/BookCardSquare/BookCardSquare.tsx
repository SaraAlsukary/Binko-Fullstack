import styles from './BookCardSquare.module.css';
import { Button } from '@components/feedback';
import { TBooks } from '@customtypes/booksTypes';
import { useAppSelector } from '@hooks/app';
import { Localhost } from '@utils/localhost';
import { useNavigate } from 'react-router-dom';
const { pic, text, booCard } = styles

const BookCardSquare = ({ image, description, user, name, id }: TBooks) => {

    const chars = (description: string) => {
        var des = ''
        for (let index = 0; index < description?.length && index < 400; index++) {
            const element = description[index];
            des += element
        }
        des += '...'
        return des
    }
    const desc = chars(description as string)
    const navigate = useNavigate();
    const { language } = useAppSelector(state => state.language);
    return (
        <div onClick={() => navigate(`${id}`)} className={booCard} >
            <div className={pic}>
                <img src={`${Localhost}${image}`} alt="" crossOrigin='anonymous' />
            </div>
            <div className={text}>
                <h3>{name}</h3>
                <span>{user?.name}</span>
                <p>{desc}</p>
                <Button>
                    {language === 'Arabic' ? 'قراءة' : 'Read'}
                </Button >
            </div>
        </div>
    )
}

export default BookCardSquare
