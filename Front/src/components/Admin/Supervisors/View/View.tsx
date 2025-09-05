import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import { TUser } from '@customtypes/userType';
import actGetSupervisor from '@store/supervisorSlice/act/actGetSupervisor';
import { Localhost } from '@utils/localhost';

const initialUserInfo: TUser = {
    name: '',
    id: 0,
    image: '',
    discriptions: ''
}

function View({ userId }: { userId: number }) {
    const [userInfo, setUserInfo] = useState(initialUserInfo);
    const { supervisors } = useAppSelector(state => state.supervisors);
    const { language } = useAppSelector(state => state.language);
    const dispatch = useAppDispatch()
    const user = supervisors.find((user) => user.id == userId)
    useEffect(() => {
        dispatch(actGetSupervisor())
    }, [language])
    useEffect(() => {
        if (supervisors)
            fetchUserData()

    }, [supervisors]);

    const fetchUserData = () => {
        setUserInfo(user as TUser);

    }


    return (
        <div className='user-view'>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'Profile:' : "الصورة"}</span>
                            {userInfo.image && <img src={`${Localhost}${userInfo?.image}`} />}
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'Name:' : "الاسم"}</span>
                            {userInfo.name && <span>{userInfo.name}</span>}

                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'Bio:' : "الوصف"}</span>
                            {userInfo.discriptions && <span>{userInfo.discriptions}</span>}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default View