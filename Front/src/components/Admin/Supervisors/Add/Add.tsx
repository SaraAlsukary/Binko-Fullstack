import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import Eye from '@assets/svgs/eye-svgrepo-com(1).svg?react';
import EyeClosed from '@assets/svgs/eye-slash-svgrepo-com(1).svg?react';
import actAddSupervisor from '@store/supervisorSlice/act/actAddSupervisor';
import toast from 'react-hot-toast';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import { actClearCategories } from '@store/categorySlice/categorySlice';
import actAcceptUser from '@store/usersSlice/act/actAcceptUser';
import { TUser } from '@customtypes/userType';


function Add() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showEye, setShowEye] = useState(false);
    const [category, setCategory] = useState('');
    const [showEye1, setShowEye1] = useState(false);
    const [confirm_password, setConfirmPassword] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language)
    const { categories } = useAppSelector(state => state.categories)
    const addNewUser = () => {
        const data = {
            name,
            username,
            password,
            confirm_password,
            category
        }
        dispatch(actAddSupervisor(data)).unwrap().then((res:TUser) => {
            language === 'English' ? toast.success('New Supervisor Added!') : toast.success('تم اضافة مشرف جديد!')
            dispatch(actAcceptUser(res?.id!))
        })
    }
    const cateOptions = categories.map(cate => <option value={cate.name}>{language === 'English' ? cate.name : cate.name_arabic}</option>)
    useEffect(() => {
        const promiseCate = dispatch(actGetCategories());
        return () => {
            promiseCate.abort();
            dispatch(actClearCategories())
        }
    }, [])


    return (
        <div className='user-view _add-view'>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder={language === 'English' ? 'Enter Name' : "الاسم"}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>

                        <input
                            type='text'
                            className='form-control'
                            placeholder={language === 'English' ? 'Enter Email' : "الايميل"}
                            onChange={e => setUsername(e.target.value)}
                        />

                    </div>
                    <div className='d-flex justify-content-center mt-4 mb-4'>
                        <p className='fs-5'>{language === 'English' ? "choose category: ":"اختر تصنيف: "}</p>
                        <select style={{ width: '80%',margin:"0 10px" }} onChange={(e) => setCategory(e.target.value)}>
                            {cateOptions}
                        </select>
                    </div>
                    <div className='col-sm-12 col-md-6'>

                        <div style={{ position: "relative" }}>
                            <input
                                type={!showEye1 ? 'password' : 'text'}
                                className='form-control'
                                placeholder={language === 'English' ? 'Enter Password' : "كلمة المرور"}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div style={{ position: 'absolute', left: "32px", top: '5px', cursor: 'pointer' }} onClick={() => setShowEye1(!showEye1)}>
                                {!showEye1 ? <Eye style={{ width: '20px', height: '20px' }} /> : <EyeClosed style={{ width: '20px', height: '20px' }} />}
                            </div>
                        </div>
                    </div>

                    <div className='col-sm-12 col-md-6'>

                        <div style={{ position: "relative" }}>
                            <input
                                type={!showEye ? 'password' : 'text'}
                                className='form-control'
                                placeholder={language === 'English' ? 'Enter Confirm Password' : "تأكيد كلمة المرور"}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />
                            <div style={{ position: 'absolute', left: "32px", top: '5px', cursor: 'pointer' }} onClick={() => setShowEye(!showEye)}>
                                {!showEye ? <Eye style={{ width: '20px', height: '20px' }} /> : <EyeClosed style={{ width: '20px', height: '20px' }} />}
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>
                {language === 'English' ? 'Add New Supervisor' : "اضافة مشرف جديد"}
            </button>
        </div>
    )
}

export default Add