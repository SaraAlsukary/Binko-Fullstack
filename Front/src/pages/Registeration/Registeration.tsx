import { Input } from "@components/feedback"
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import style from './Registeration.module.css';
import { actCreateAccount } from "@store/auth/authSlice";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { book, bookReg, register, bottom, regInput } = style;
const Registeration = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, serConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.language.language);
    type TUser = {
        name: string,
        username: string,
        password: string,
        confirm_password: string
    }
    const userData: TUser = {
        name: name,
        username: email,
        password: password,
        confirm_password: confirmPassword
    }
    const regHandler = () => {
        dispatch(actCreateAccount(userData))
            .unwrap()
            .then(() => navigate('/Binko/'))
            .catch(err => err)

    }
    return (
        <div >
            <Container className={register}>
                <div className={bookReg}>
                    <div className={book}>
                        <LottieHandler type="flyingBook" loop={true} style={{ width: '300px' }} />
                    </div>
                    <div className={bottom}>
                        <div className={regInput}>
                            <Input onChange={(e) => setName(e.target.value)} placeholder={language === 'English' ? 'Username' : 'اسم المستخدم'} type="text" />

                        </div>
                        <div className={regInput}>
                            <Input onChange={(e) => setEmail(e.target.value)} placeholder={language === 'English' ? 'Email' : ' الايميل'} type="email" />

                        </div>
                        <div className={regInput}>
                            <Input onChange={(e) => setPassword(e.target.value)} placeholder={language === 'English' ? 'Password' : 'كلمة المرور'} type="password" />
                        </div>
                        <div className={regInput}>
                            <Input onChange={(e) => serConfirmPassword(e.target.value)} placeholder={language === 'English' ? 'Confirm Password' : ' تأكيد كلمة المرور'} type="password" />

                        </div>
                        <div className={regInput}>
                            <Input onClick={regHandler} style={{ backgroundColor: 'var(--secondary-color)' }} value={language === 'English' ? 'Register' : 'تسجيل'} type="submit" />
                        </div>


                    </div>

                </div>
            </Container>
        </div>
    )
}

export default Registeration

