import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@components/feedback"
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { z } from 'zod';
import Eye from '@assets/svgs/eye-svgrepo-com(1).svg?react';
import EyeClosed from '@assets/svgs/eye-slash-svgrepo-com(1).svg?react';
import style from './Login.module.css';
import { Alert, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { actLogin } from "@store/auth/authSlice";
const { book, bookReg, registers, bottom, account, forgot } = style

type TUser = {
    username: string,
    password: string,
}

const Login = () => {


    const { error } = useAppSelector(state => state.auth);
    const language = useAppSelector(state => state.language.language);
    const [showEye, setShowEye] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const userData: TUser = {
        username: username,
        password: password,
    }


    const navigate = useNavigate();
    const schema = z.object({
        username: z.string()
            .min(1, { message: language === 'English' ? 'email is required!' : "حقل الايميل مطلوب" })
            .email({ message: language === 'English' ? 'invalid email!' : "بريد إلكتروني غير صالح" }),
        password: z.string()
            .min(1, { message: language === 'English' ? 'password is required!' : "حقل كلمة المرور مطلوب  " })
            .min(8, { message: language === 'English' ? "Password must at least be 8 characters" : "يجب أن تكون كلمة المرور 8 أحرف على الأقل" }),

    });
    type Inputs = z.infer<typeof schema>;
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });
    const loginHandler: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            dispatch(actLogin(userData))
                .unwrap()
                .then((res) => {
                    if (res.user.is_admin) {
                        navigate('/Binko/admin')
                    } else if (res.user.is_supervisor) {
                        navigate('/Binko/supervisor')
                    } else {
                        navigate('/Binko/')
                    }
                })
                .catch(err => err)
            setUsername('')
            setPassword('')

        } catch (error) {
            setError("username", {
                message: 'This email is already taken'
            })
        }
    }
    return (
        <div >
            <Container className={registers}>
                <div className={bookReg}>
                    <div className={book}>
                        <LottieHandler type="flyingBook" loop={true} style={{ width: '300px' }} />
                    </div>
                    <div className={bottom}>

                        <Form className='form' onSubmit={handleSubmit(loginHandler)}>
                            <Form.Group className="mb-3 " controlId="formBasicEmail">
                                <Form.Control type="email" placeholder={language === 'English' ? 'Email' : 'الايميل '} {...register("username"

                                )}
                                    onChange={(e: any) => setUsername(e.target.value)}

                                />

                                {!errors.username ? <Form.Text className="text-muted">
                                </Form.Text> : <Alert className='dangerAlert' key='danger' variant='danger'>{errors.username.message}</Alert>}
                            </Form.Group>
                            <Form.Group
                                style={{ position: 'relative' }}
                                className="mb-3" controlId="formBasicPassword">
                                <Form.Control type={showEye ? 'text' : 'password'} placeholder={language === 'English' ? 'Password' : '  كلمة المرور'} {...register('password'
                                )}
                                    onChange={(e: any) => setPassword(e.target.value)}

                                />
                                <div style={language === 'English' ? { position: 'absolute', right: "30px", top: '10px', cursor: 'pointer' } : { position: 'absolute', right: 'initial', left: "30px", top: '10px', cursor: 'pointer' }} onClick={() => setShowEye(!showEye)}>
                                    {!showEye ? <Eye style={{ width: '20px', height: '20px' }} /> : <EyeClosed style={{ width: '20px', height: '20px' }} />}
                                </div>
                            </Form.Group>
                            {errors.password && <Alert className='dangerAlert' key='danger' variant='danger'>{errors.password.message}</Alert>}
                            {error && <Alert className='dangerAlert' key='dangerssss' variant='danger'>{error?.non_field_errors[0]}</Alert>}

                            {/* <p className={forgot}>{language === 'English' ? 'Forgot Password?' : 'نسيت كلمة المرور؟'}</p> */}

                            <Button
                                disabled={isSubmitting} type="submit">
                                {isSubmitting && language == 'English' ? "Loading..." : isSubmitting && language == 'Arabic' ? "يتم التحميل.." : language === 'English' ? 'Login' : 'تسجيل'}
                            </Button>
                            <p onClick={() => navigate('/Binko/registration')} className={account}>{language === 'English' ? 'Create a new account' : ' انشاء حساب جديد'}</p>

                        </Form>

                    </div>

                </div>
            </Container>

        </div>
    )
}

export default Login
