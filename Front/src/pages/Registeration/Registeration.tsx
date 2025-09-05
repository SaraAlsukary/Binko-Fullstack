import { Button } from "@components/feedback"
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import style from './Registeration.module.css';
import { actCreateAccount } from "@store/auth/authSlice";
import { Alert, Container, Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Eye from '@assets/svgs/eye-svgrepo-com(1).svg?react';
import EyeClosed from '@assets/svgs/eye-slash-svgrepo-com(1).svg?react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const { book, bookReg, registers, bottom } = style;

type TUser = {
    name: string,
    username: string,
    password: string,
    confirm_password: string
}

const Registeration = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showEye, setShowEye] = useState(false);
    const [showEye1, setShowEye1] = useState(false);

    const [confirm_password, setConfirmPassword] = useState('');
    
    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.language.language);
    const { error } = useAppSelector(state => state.auth);
    const schema = z.object({
        name: z.string().min(1, { message: language === 'English' ? 'name is required!' : "حقل الاسم مطلوب" }),
        username: z.string().min(1, { message: language === 'English' ? 'email is required!' : "حقل الايميل مطلوب" }).email({ message: language === 'English' ? 'invalid email!' : "بريد إلكتروني غير صالح" }),
        password: z.string().min(1, { message: language === 'English' ? 'password is required!' : "حقل كلمة المرور مطلوب" })
            .min(8, { message: language === 'English' ? "Password must at least be 8 characters" : "يجب أن تكون كلمة المرور 8 أحرف على الأقل" })
            .regex(/[a-zA-Z]/, { message: language === 'English' ? "Password must at least contain 1 string" : "يجب أن تحتوي كلمة المرور على حرف واحد على الأقل" })
            .regex(/\d/, { message: language === 'English' ? "Password must at least contain 1 number" : "يجب أن تحتوي كلمة المرور على رقم واحد على الأقل" }),
        confirmPassword: z.string()
            .min(1, { message: language === 'English' ? "Confirm password is required" : "تأكيد كلمة المرور مطلوب" })
    }).superRefine((data, ctx) => {

        if (data.password !== data.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: language === 'English' ? "Password and its Confirm must be matched" : "كلمتا المرور غير متطابقتين",
                path: ["confirmPassword"]
            });
        }
    });
    type Inputs = z.infer<typeof schema>;

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
        mode: "onChange"
    });


    const loginHandler: SubmitHandler<Inputs> = async () => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            console.log(userData)
            dispatch(actCreateAccount(userData))
                .unwrap()
                .then((res) => {
                    if (res) {
                        navigate('/Binko/addProfile')
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
                            <Form.Group className="mb-3 " controlId="name">
                                <Form.Control type="text" placeholder={language === 'English' ? 'Username' : 'اسم المستخدم'} {...register("name"

                                )}
                                    onChange={(e: any) => setName(e.target.value)}
                                />
                                {/* {errors.email && <span>{errors.email.message}</span>} */}
                                {!errors.name ? <Form.Text className="text-muted">
                                </Form.Text> : <Alert className='dangerAlert' key='dangers' variant='danger'>{errors.name.message}</Alert>}
                            </Form.Group>
                            <Form.Group className="mb-3 " controlId="email">
                                <Form.Control type="email" placeholder={language === 'English' ? 'Email' : 'الايميل '} {...register("username"

                                )}
                                    onChange={(e: any) => setUsername(e.target.value)}

                                />
                                {/* {errors.email && <span>{errors.email.message}</span>} */}
                                {!errors.username ? <Form.Text className="text-muted">
                                </Form.Text> : <Alert className='dangerAlert' key='dangerss' variant='danger'>{errors.username.message}</Alert>}
                            </Form.Group>
                            <Form.Group
                                controlId="password"
                                style={{ position: 'relative' }}
                                className="mb-3" >
                                <Form.Control type={showEye ? 'text' : 'password'} placeholder={language === 'English' ? 'Password' : '  كلمة المرور'} {...register('password'

                                )}
                                    onChange={(e: any) => setPassword(e.target.value)}
                                />    <div style={language === "English" ? { position: 'absolute', right: "32px", top: '12px', cursor: 'pointer' } : { position: 'absolute', left: "32px", top: '12px', cursor: 'pointer' }} onClick={() => setShowEye(!showEye)}>
                                    {!showEye ? <Eye style={{ width: '20px', height: '20px' }} /> : <EyeClosed style={{ width: '20px', height: '20px' }} />}
                                </div>

                            </Form.Group>
                            {errors.password && <Alert className='dangerAlert' key='dangersss' variant='danger'>{errors.password.message}</Alert>}
                            <Form.Group
                                controlId="confirm"

                                style={{ position: 'relative' }}
                                className="mb-3" >
                                <Form.Control type={showEye1 ? 'text' : 'password'} placeholder={language === 'English' ? 'Confirm Password' : ' تأكيد كلمة المرور'} {...register('confirmPassword'

                                )}
                                    onChange={(e: any) => setConfirmPassword(e.target.value)}

                                />
                                <div style={language === "English" ? { position: 'absolute', right: "32px", top: '12px', cursor: 'pointer' } : { position: 'absolute', left: "32px", top: '12px', cursor: 'pointer' }} onClick={() => setShowEye1(!showEye1)}>
                                    {!showEye1 ? <Eye style={{ width: '20px', height: '20px' }} /> : <EyeClosed style={{ width: '20px', height: '20px' }} />}
                                </div>
                            </Form.Group>
                            {errors.confirmPassword && <Alert className='dangerAlert' key='danger' variant='danger'>{errors.confirmPassword.message}</Alert>}
                            {error && <Alert className='dangerAlert' key='dangerssss' variant='danger'>{error?.non_field_errors[0]}</Alert>}

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

