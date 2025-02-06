import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "@components/feedback"
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { z } from 'zod';
import style from './Login.module.css';
import { Alert, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useState } from "react";
import { actLogin } from "@store/auth/authSlice";
const { book, bookReg, registers, bottom, account, forgot } = style
const schema = z.object({
    username: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }).email(),
    password: z.string({ required_error: 'required field', invalid_type_error: 'password is required!' }).min(8),

});
type TUser = {
    username: string,
    password: string,
}
type Inputs = z.infer<typeof schema>;

const Login = () => {


    const language = useAppSelector(state => state.language.language);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const userData: TUser = {
        username: username,
        password: password,
    }

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>({
        resolver: zodResolver(schema),
    });
    const navigate = useNavigate();

    const loginHandler: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            dispatch(actLogin(userData))
                .unwrap()
                .then((res) => {
                    if (res.user_type === 'admin') {
                        console.log('admin')
                        navigate('/Binko/admin')
                    } else if (res.user_type === 'supervisor') {
                        console.log('supervisor')
                        navigate('/Binko/supervisor')
                    } else {
                        // console.log(res.id)
                        // console.log(res.data.id)
                        console.log(res)
                        console.log('superuser')
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
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder={language === 'English' ? 'Password' : '  كلمة المرور'} {...register('password'

                                )}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            {errors.password && <Alert className='dangerAlert' key='danger' variant='danger'>{errors.password.message}</Alert>}

                            <p className={forgot}>{language === 'English' ? 'Forgot Password?' : 'نسيت كلمة المرور؟'}</p>

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
