import { useEffect, useState } from 'react'
import { useAppSelector } from '@hooks/app';
import { TUser } from '@customtypes/userType';

const initialUserInfo: TUser = {
    name: '',
    id: 0,
    image: '',
    discriptions: ''
}

function View({ userId }: { userId: number }) {
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const { users } = useAppSelector(state => state.users);
    const { language } = useAppSelector(state => state.language);
    const user = users.find((user) => user.id == userId)
    useEffect(() => {
        fetchUserData()
    }, []);

    const fetchUserData = () => {
        setUserInfo(user as TUser);

    }


    return (
        <div className='user-view'>
            <h1>Basic Info</h1>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'Profile:' : "الصورة"}</span>
                            <img src={`http://127.0.0.1:8000${userInfo.image}`} />
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'Name:' : "الاسم"}</span>
                            <span>{userInfo.name}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'Bio:' : "الوصف"}</span>
                            <span>{userInfo.discriptions}</span>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default View