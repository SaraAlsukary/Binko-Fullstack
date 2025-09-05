import { Input } from "@components/feedback"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import style from './AddProfile.module.css';
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Picture from "@components/common/Picture/Picture";
import SecondaryButton from "@components/feedback/SecondaryButton/SecondaryButton";
import actAddProfile from "@store/auth/act/actAddProfile";
const { book, bookReg, btn, registers, bottom, info, inputs, reader } = style;

const Registeration = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [loading, SetLoading] = useState(false);
    const [des, setDes] = useState('');
    const [age, setAge] = useState<null | number>(null);
    const [is_reader, setIsReader] = useState<null | boolean>(false);

    const [imageFile, setImageFile] = useState('');
    const [file, setFile] = useState('');

    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.language.language);

    const dataform = new FormData

    const updateHandler = async () => {
        try {
            SetLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))

            dataform.append('image', imageFile)
            dataform.append('discriptions', des)
            dataform.append('is_reader', is_reader)
            dataform.append('age', age)
            dataform.append('name', name)
            dispatch(actAddProfile(dataform))
                .unwrap()
                .then(() => {
                    SetLoading(false)
                    toast.success('successfully updated profile!')
                    navigate('/Binko/waiting')
                })
        } catch (e) {
            console.log(e)
        }

    }

    const imageHandler = (e: any) => {
        setFile(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0]);
    }

    return (
        <div >
            <Container className={registers}>

                <div className={bookReg}>
                    <div className={book}>
                        <Picture imageHandler={imageHandler} file={file} />
                    </div>
                    <div className={bottom}>
                        <div className={inputs}>
                            <div className={info}>
                                {language === 'English' ? " My informations" : " معلوماتي "}
                            </div>
                            <form>
                                <label className={reader} htmlFor="reader">
                                    <Input checked={is_reader === '1' ? true : false} name="reader"
                                        value="1" id="reader" onChange={(e: any) => setIsReader(e.target.value)}
                                        type='radio' style={{ width: '15px', height: '15px' }} />
                                    <span>
                                        {language === "English" ? "reader" : "قارئ"}
                                    </span>
                                </label>
                                <label className={reader} htmlFor="author">
                                    <Input checked={is_reader === '0' ? true : false}
                                        name="author" value="0" id="author"
                                        onChange={(e: any) => setIsReader(e.target.value)} type='radio'
                                        style={{ width: '15px', height: '15px' }} />
                                    <span>
                                        {language === "English" ? "author" : "كاتب"}
                                    </span>
                                </label>
                                <Input onChange={(e: any) => setName(e.target.value)} type='text' placeholder={language === 'English' ? 'userame' : 'اسم المستخدم'} />
                                <Input onChange={(e: any) => setAge(e.target.value)} type='number' placeholder={language === 'English' ? 'Age' : 'العمر'} />
                                <Input onChange={(e: any) => setDes(e.target.value)} type='text' placeholder={language === 'English' ? 'info' : 'نبذة'} />
                                <SecondaryButton className={btn} onClick={updateHandler} disabled={loading} >{(loading && language === 'Arabic') ? "..جاري التحميل" : (loading && language === 'English') ? "Loading..." : language === 'Arabic' ? 'اضافة' : 'Add'} </SecondaryButton>
                            </form>

                        </div>

                    </div>
                </div>

            </Container >
        </div>
    )
}

export default Registeration

