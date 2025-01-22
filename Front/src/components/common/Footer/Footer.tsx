import { Container } from 'react-bootstrap';
import styles from './Footer.module.css';
import { useAppSelector } from '@hooks/app';
const { footerContainer } = styles;
const Footer = () => {
    const { language } = useAppSelector(state => state.language);
    return (
        <footer className={footerContainer}>
            <Container >
                <p><span>Binko</span> &copy; {language === 'English' ? ` All Rights Reserved 2025` : `جميع الحقوق محفوظة 2025`}</p>
            </Container >
        </footer>
    )
}

export default Footer
