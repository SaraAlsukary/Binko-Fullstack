import LottieHandler from '@components/feedback/lottieHandler/lottieHandler';
import Style from './Landing.module.css';
import { Button } from '@components/feedback';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '@hooks/app';
import { useNavigate } from 'react-router-dom';

const { landingContainer, landing, left, right, para, mobile } = Style;
const Landing = () => {
    const navigate = useNavigate();
    const language = useAppSelector(state => state.language.language);

    return (
        <div className={landingContainer}>
            <Container className={landing}>
                <div className={left}>
                    <p className={`${para}  ${mobile}`} >
                        {language === 'English' ? 'Binko is a storytelling community, Where you can discover original stories and books, Also it is a very beautiful place where you can activate with other authors by your opinoin, What are you waiting, Go make your dream book!'
                            : " بينكو هو مجتمع لسرد القصص، حيث يمكنك اكتشاف القصص والكتب الأصلية، كما أنه مكان جميل جدًا حيث يمكنك التفاعل مع مؤلفين آخرين من خلال رأيك، ماذا تنتظر، اذهب واصنع كتاب أحلامك!"}</p>
                    <Button onClick={() => navigate('/Binko/books')} className={mobile} >{language === 'Arabic' ? 'تصفح' : "let's go"}</Button>
                </div>
                <div className={right}>
                    <LottieHandler loop={false} type={'girl'} style={{ width: '390px' }} />
                </div>

            </Container >
        </div >
    )
}

export default Landing;
