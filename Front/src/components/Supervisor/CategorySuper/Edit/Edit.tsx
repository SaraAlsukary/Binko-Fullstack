import React, { useEffect, useState } from 'react'
import axios from 'axios';
import actUpdateCategory from '@store/categorySlice/act/actUpdateCategory';
import { useAppDispatch } from '@hooks/app';


function EditUser({ id }: { id: number }) {
    const [userInfo, setUserInfo] = useState('');
    const [name, setName] = useState('');
    const [ar_name, setAraName] = useState('');
    const [file, setFile] = useState('');

    const dispatch = useAppDispatch();

    const editExistUser = async () => {
        const formdata = new FormData();
        formdata.append("name", name)
        formdata.append("file", file)
        formdata.append("name_arabic", ar_name)

        const data = {
            formdata,
            id: id
        }
        dispatch(actUpdateCategory(data)).unwrap().then(() => {
            alert('updated successfully!');
            setName('')
            setAraName('')
            setFile('')
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
                                placeholder='Enter Full Name'
                                onChange={e => setName(e.target.value)}

                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Arabic Name:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Username'
                                onChange={e => setAraName(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>File:</span>
                            <input
                                type='file'
                                className='form-control'
                                placeholder='Enter Email Address'
                                onChange={e => setFile(e.target.files[0])}

                            />
                        </p>
                    </div>


                </div>
            </div>


            <button className='btn btn-success' onClick={() => editExistUser()}>Edit Category</button>
        </div>
    )
}

export default EditUser