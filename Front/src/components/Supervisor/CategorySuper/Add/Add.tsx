import { useEffect, useState } from 'react'
import axios from 'axios';
import actAddCategory from '@store/categorySlice/act/actAddCategory';
import { useAppDispatch } from '@hooks/app';

const initialUserInfo = {
    name: '',
    arabic_name: '',
    file: '',
}

function Add(props: { setUserAdded: () => void }) {
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const [file, setFile] = useState("");
    const [name, setName] = useState("");
    const [araName, setArName] = useState("");
    const dispatch = useAppDispatch();
    const fileHandler = (e: any) => {
        // setAudioFile(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    const addNewUser = () => {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("name_arabic", araName);
        formdata.append("file", file);
        // try {
        //     const response = await axios.post('http://localhost:4000/users', userInfo);
        //     if (response) {
        //         props.setUserAdded();
        //     }
        // }
        // catch (e) {
        //     console.log(e)
        // }
        dispatch(actAddCategory(formdata)).unwrap().then(() => {
            alert('Added Successfully!')
            setFile('')
            setName('')
            setArName('')
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
                                value={name}
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
                                placeholder='Enter Arabic Name'
                                value={araName}
                                onChange={e => setArName(e.target.value)}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>File:</span>
                            <input
                                type='file'
                                className='form-control'
                                placeholder='Enter file'
                                // value={file}
                                onChange={fileHandler}
                            />
                        </p>
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>Add New Category</button>
        </div>
    )
}

export default Add