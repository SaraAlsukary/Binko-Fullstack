import { useState } from 'react'
import axios from 'axios';
import Eye from '@assets/svgs/eye-svgrepo-com(1).svg?react';
import EyeClosed from '@assets/svgs/eye-slash-svgrepo-com(1).svg?react';
import { useAppDispatch } from '@hooks/app';
import { actUpdateProfile } from '@store/auth/authSlice';
import toast from 'react-hot-toast';


function EditUser(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showEye, setShowEye] = useState(false);
    const [showEye1, setShowEye1] = useState(false);
    const [confirm_password, setConfirmPassword] = useState('');
    const { language } = useAppSelector(state => state.language)

    const [is_supervisor, setSupervisor] = useState(1);
    const dispatch = useAppDispatch();
    const addNewUser = () => {
        const data = {
            name,
            username,
            password,
            confirm_password,
            is_supervisor
        }
        dispatch(actUpdateProfile(data)).unwrap().then(() => {

            language === 'English' ? toast.success(' Supervisor Edited successfully!') : toast.success('تم اضافة مشرف جديد!')

        })
    }



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

            <h1>User Address</h1>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>City:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter City Name'
                                value={userInfo.address.city}
                                onChange={e => setUserInfo({
                                    ...userInfo,
                                    address: {
                                        ...userInfo.address,
                                        city: e.target.value
                                    }
                                })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Street:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Street Name'
                                value={userInfo.address.street}
                                onChange={e => setUserInfo({
                                    ...userInfo,
                                    address: {
                                        ...userInfo.address,
                                        street: e.target.value
                                    }
                                })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Suite:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Suite Name'
                                value={userInfo.address.suite}
                                onChange={e => setUserInfo({
                                    ...userInfo,
                                    address: {
                                        ...userInfo.address,
                                        suite: e.target.value
                                    }
                                })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>ZIP Code:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter ZIP Code'
                                value={userInfo.address.zipcode}
                                onChange={e => setUserInfo({
                                    ...userInfo,
                                    address: {
                                        ...userInfo.address,
                                        zipcode: e.target.value
                                    }
                                })}
                            />
                        </p>
                    </div>
                </div>
            </div>

            <h1>User Company</h1>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Company Name:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Company Name'
                                value={userInfo.company.name}
                                onChange={e => setUserInfo({
                                    ...userInfo,
                                    company: {
                                        ...userInfo.company,
                                        name: e.target.value
                                    }
                                })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Catch Phrase:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Catch Phrase'
                                value={userInfo.company.catchPhrase}
                                onChange={e => setUserInfo({
                                    ...userInfo,
                                    company: {
                                        ...userInfo.company,
                                        catchPhrase: e.target.value
                                    }
                                })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>BS:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter BS'
                                value={userInfo.company.bs}
                                onChange={e => setUserInfo({
                                    ...userInfo,
                                    company: {
                                        ...userInfo.company,
                                        bs: e.target.value
                                    }
                                })}
                            />
                        </p>
                    </div>
                </div>
            </div>

            <button className='btn btn-success' onClick={() => editExistUser()}>Edit User</button>
        </div>
    )
}

export default EditUser