import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import Eye from '@assets/svgs/eye-svgrepo-com(1).svg?react';
import EyeClosed from '@assets/svgs/eye-slash-svgrepo-com(1).svg?react';
import actAddSupervisor from '@store/supervisorSlice/act/actAddSupervisor';
import toast, { Toaster } from 'react-hot-toast';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import { actClearCategories } from '@store/categorySlice/categorySlice';


function Add(props: { setUserAdded: () => void }) {
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
        dispatch(actAddSupervisor(data)).unwrap().then(() => {
            language === 'English' ? toast.success('New Supervisor Added!') : toast.success('تم اضافة مشرف جديد!')

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
            <h1>Basic Info</h1>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Name:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Name'
                                onChange={e => setName(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Email:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Email'
                                onChange={e => setUsername(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Category:</span>
                            {/* <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Name'
                                onChange={e => setCategory(e.target.value)}
                            /> */}
                            <select onChange={(e) => setCategory(e.target.value)}>
                                {cateOptions}
                            </select>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p >
                            <span>password:</span>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showEye1 ? 'password' : 'text'}
                                    className='form-control'
                                    placeholder='Enter Password'
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <div style={{ position: 'absolute', left: "32px", top: '5px', cursor: 'pointer' }} onClick={() => setShowEye1(!showEye1)}>
                                    {!showEye1 ? <Eye style={{ width: '20px', height: '20px' }} /> : <EyeClosed style={{ width: '20px', height: '20px' }} />}
                                </div>
                            </div>
                        </p>
                    </div>

                    <div className='col-sm-12 col-md-6'>
                        <p >
                            <span>Confirm Password:</span>
                            <div style={{ position: "relative" }}>
                                <input
                                    type={showEye ? 'password' : 'text'}
                                    className='form-control'
                                    placeholder='Enter Confirm Password'
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                                <div style={{ position: 'absolute', left: "32px", top: '5px', cursor: 'pointer' }} onClick={() => setShowEye(!showEye)}>
                                    {!showEye ? <Eye style={{ width: '20px', height: '20px' }} /> : <EyeClosed style={{ width: '20px', height: '20px' }} />}
                                </div>
                            </div>
                        </p>
                    </div>


                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>Add New Supervisor</button>
        </div>
    )
}

export default Add