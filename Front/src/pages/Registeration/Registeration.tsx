import { Button } from "@components/feedback"
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import style from './Registeration.module.css';
import { actCreateAccount } from "@store/auth/authSlice";
import { Alert, Container, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { book, bookReg, registers, bottom } = style;
const schema = z.object({
    name: z.string({
        required_error: 'required field', invalid_type_error: 'name is required!'
    }),
    username: z.string({ required_error: 'required field', invalid_type_error: 'email is required!' }).email(),
    password: z.string({ required_error: 'required field', invalid_type_error: 'password is required!' }).min(8),
    confirm_password: z.string({
        required_error: 'required field', invalid_type_error: 'confirm_password is required!'

    })
});
type TUser = {
    name: string,
    username: string,
    password: string,
    confirm_password: string
}
type Inputs = z.infer<typeof schema>;

const Registeration = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.language.language);

    const userData: TUser = {
        name: name,
        username: username,
        password: password,
        confirm_password: confirm_password
    }
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
            console.log(userData)
            dispatch(actCreateAccount(userData))
                .unwrap()
                .then((res) => {
                    if (res.is_admin) {
                        console.log('admin')
                    } else if (res.is_supervisor) {
                        console.log('supervisor')
                    } else {
                        console.log(res)
                        navigate('/Binko/')
                    }
                })
                .catch(err => err)
            console.log(userData)
            setName('')
            setUsername('')
            setPassword('')
            setConfirmPassword('')

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
                                <Form.Control type="text" placeholder={language === 'English' ? 'Username' : 'اسم المستخدم'} {...register("name"

                                )}
                                    onChange={(e: any) => setName(e.target.value)}
                                />
                                {/* {errors.email && <span>{errors.email.message}</span>} */}
                                {!errors.name ? <Form.Text className="text-muted">
                                </Form.Text> : <Alert className='dangerAlert' key='danger' variant='danger'>{errors.name.message}</Alert>}
                            </Form.Group>
                            <Form.Group className="mb-3 " controlId="formBasicEmail">
                                <Form.Control type="email" placeholder={language === 'English' ? 'Email' : 'الايميل '} {...register("username"

                                )}
                                    onChange={(e: any) => setUsername(e.target.value)}

                                />
                                {/* {errors.email && <span>{errors.email.message}</span>} */}
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
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control type="password" placeholder={language === 'English' ? 'Confirm Password' : ' تأكيد كلمة المرور'} {...register('confirm_password'

                                )}
                                    onChange={(e: any) => setConfirmPassword(e.target.value)}

                                />
                            </Form.Group>
                            {errors.confirm_password && <Alert className='dangerAlert' key='danger' variant='danger'>{errors.confirm_password.message}</Alert>}

                            <Button
                                disabled={isSubmitting} type="submit">
                                {isSubmitting && language == 'English' ? "Loading..." : isSubmitting && language == 'Arabic' ? "يتم التحميل.." : language === 'English' ? 'Register' : 'تسجيل'}
                            </Button>
                        </Form>

                    </div>
                </div>

            </Container >
        </div>
    )
}

export default Registeration

