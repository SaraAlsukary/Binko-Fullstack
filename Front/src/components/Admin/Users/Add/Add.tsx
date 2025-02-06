import { useEffect, useState } from 'react'
import axios from 'axios';

const initialUserInfo = {
    name: '',
    profile: '',
    comment: '',
}

function Add(props: { setUserAdded: () => void }) {
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
    }, []);

    const addNewUser = async () => {
        try {
            const response = await axios.post('http://localhost:4000/users', userInfo);
            if (response) {
                props.setUserAdded();
            }
        }
        catch (e) {
            console.log(e)
        }
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
                                value={userInfo.name}
                                onChange={e => setUserInfo({ ...userInfo, name: e.target.value })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Comment:</span>
                            <input
                                type='text'
                                className='form-control'
                                placeholder='Enter Arabic Name'
                                value={userInfo.comment}
                                onChange={e => setUserInfo({ ...userInfo, comment: e.target.value })}
                            />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Profile:</span>
                            <input
                                type='file'
                                className='form-control'
                                placeholder='Enter file'
                                value={userInfo.profile}
                                onChange={e => setUserInfo({ ...userInfo, profile: e.target.value })}
                            />
                        </p>
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>Add New User</button>
        </div>
    )
}

export default Add