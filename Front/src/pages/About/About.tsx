import { Container } from 'react-bootstrap';
import Styles from './About.module.css';
import LottieHandler from '@components/feedback/lottieHandler/lottieHandler';
import { useAppSelector } from '@hooks/app';
const { pic, parag, aboutContainer, cont } = Styles
const About = () => {
    const { language } = useAppSelector(state => state.language);

    return (
        <div className={aboutContainer}>
            <Container className={cont}>
                <div className={pic}>
                    <LottieHandler type='BooksAbout' loop={true} style={{
                        width: '300px', position: 'absolute',
                        left: '0',
                        top: '30%'
                    }} />
                </div>
                <div className={parag}>
                    <h2>{language === 'English' ? "Welcome to Our Community Binko!" : "مرحبا بكم في  بينكو!"}</h2>
                    <p> {language === 'English' ? 'This Community offers you many beautiful books in different field. It allows you to interact with these books and add your comments expressing your opinions about these books. We hope you like it' :
                        " هذا المجتمع يقدم لكم العديد من الكتب الجميلة في مجالات مختلفة. و يتيح لكم إمكانية التفاعل مع هذه الكتب و إضافة تعليقاتكم المعبرة عن آرائكم بهذه الكتب. نتمنى ان ينال إعجابكم"}</p>
                </div>

            </Container>
        </div>
    )
}

export default About
