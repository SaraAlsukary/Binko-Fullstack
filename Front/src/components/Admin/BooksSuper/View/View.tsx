import { useEffect, useState } from 'react'
import axios from 'axios';

const initialUserInfo = {
    name: '',
    author: '',
    profile: '',

}

function View(props) {
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
        fetchUserData()
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/users/' + props.userId);
            if (response) {
                console.log(response.data);
                setUserInfo(response.data);
            }
            return
        }
        catch (e) {
            console.log(e)
        }
    }


    return (
        <div className='user-view'>
            <h1>Basic Info</h1>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Profile:</span>
                            <img src={userInfo.profile} />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Name:</span>
                            <span>{userInfo.name}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>Author:</span>
                            <span>{userInfo.author}</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default View