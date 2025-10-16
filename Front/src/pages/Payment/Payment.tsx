import './Payment'
import { Container } from 'react-bootstrap'
import LottieHandler from '@components/feedback/lottieHandler/lottieHandler'
import { useAppSelector } from '@hooks/app';
import { Input } from '@components/feedback';

const Payment = () => {
const { language } = useAppSelector(state => state.language);
    return (
        <Container className='payment'>
            <div className="top d-flex justify-content-center align-items-center" >
                <LottieHandler type='girl' style={{ width: "400px " }} loop={false} />
            </div>
            <div className="bottom d-flex flex-column justify-content-center align-items-center mt-4" >
                <h2>{language === "English" ? "Payment Info" : "معلومات الدفع"}</h2>
                <div className="d-flex flex-column justify-content-center  align-items-center">
                    <div className='mt-2'>
                        <Input type="text" placeholder={language === "English" ? "Card Number" : "رقم البطاقة"} />
                    </div>
                    <div className='mt-2'>
                        <Input type="text" placeholder={language === "English" ? "Card Holder Name" : "اسم صاحب البطاقة"} />
                    </div>
                    <div className='mt-2'>
                        <Input type="text" placeholder={language === "English" ? "Expiry Date" : "تاريخ الانتهاء"} />
                    </div>
                    <div className='mt-2'>
                        <Input type="text" placeholder={language === "English" ? "Billing Address" : "عنوان الفواتير"} />
                    </div>
                    <div className='mt-2'>
                        <Input type="text" placeholder={language === "English" ? "CVV" : "CVV"} />
                    </div>
                    <div className='mt-2'>
                        <Input type="submit" value={language === 'English' ? "Pay" : "دفع"} style={{ backgroundColor: "var(--secondary-color)" }} />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Payment