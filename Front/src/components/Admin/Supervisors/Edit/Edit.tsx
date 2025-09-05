import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@hooks/app';
import toast from 'react-hot-toast';
import actUpdateSupervisor from '@store/supervisorSlice/act/actUpdateSupervisor';
import actGetSupervisor from '@store/supervisorSlice/act/actGetSupervisor';
import { TUser } from '@customtypes/userType';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import { actClearCategories } from '@store/categorySlice/categorySlice';

function Edit(props: { id: number }) {
    const { supervisors } = useAppSelector(state => state.supervisors)
    const user = supervisors.find((user) => user.id === props.id)
    const [userInfo, setUserInfo] = useState<null | TUser>(user!);
    const [name, setName] = useState(userInfo?.name!);
    const [username, setUsername] = useState(userInfo?.username!);
    const [category, setCategory] = useState('');
    const { language } = useAppSelector(state => state.language)
    const { categories } = useAppSelector(state => state.categories)

    const dispatch = useAppDispatch();
    const editSuper = () => {
        const data = {
            id: props.id,
            name,
            username,
            category
        }
        dispatch(actUpdateSupervisor(data)).unwrap().then(() => {

            language === 'English' ? toast.success(' Supervisor Edited successfully!') : toast.success('تم تعديل مشرف !')

        })
    }
    const cateOptions = categories.map(cate => <option value={cate.id}>{language === 'English' ? cate.name : cate.name_arabic}</option>)
    useEffect(() => {
        const promiseCate = dispatch(actGetCategories());
        return () => {
            promiseCate.abort();
            dispatch(actClearCategories())
        }
    }, [])


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
        <div className='user-view _add-view'>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder={language === 'English' ? 'Enter Email' : "الايميل"}

                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter Email'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-content-center mt-4 mb-4'>
                        <p className='fs-5'>{language === 'English' ? "choose category: " : "اختر تصنيف: "}</p>
                        <select style={{ width: '80%', margin: "0 10px" }} onChange={(e) => setCategory(e.target.value)}>
                            {cateOptions}
                        </select>
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={() => editSuper()}>{language === 'English' ? "Edit" : "تعديل"}</button>
        </div>
    )
}

export default Edit