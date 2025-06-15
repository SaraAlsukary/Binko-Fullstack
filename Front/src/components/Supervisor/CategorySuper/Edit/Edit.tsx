import { useEffect, useState } from 'react'
import actUpdateCategory from '@store/categorySlice/act/actUpdateCategory';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import toast from 'react-hot-toast';


function EditUser({ id }: { id: number }) {
    const { categories } = useAppSelector(state => state.categories);
    const categoryInfo = categories.find(cat => cat.id === id);
    const [name, setName] = useState(categoryInfo?.name);
    const { language } = useAppSelector(state => state.language);
    const [ar_name, setAraName] = useState(categoryInfo?.name_arabic);
    const [file, setFile] = useState('');

    const dispatch = useAppDispatch();

    const editExistUser = async () => {
        const formdata = new FormData();
        formdata.append("name", name!)
        formdata.append("file", file)
        formdata.append("name_arabic", ar_name!)

        const data = {
            formdata,
            id: id
        }
        dispatch(actUpdateCategory(data)).unwrap().then(() => {
            toast.success('updated successfully!');
            setName('')
            setAraName('')
            setFile('')
        })
    }
    useEffect(() => {
        dispatch(actGetCategories())
    }, [])
    useEffect(() => {
        if (categories) {
            setName(categoryInfo?.name)
            setAraName(categoryInfo?.name_arabic)
        }
    }, [categories])
    return (
        <div className='user-view _add-view'>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>

                        <input
                            type='text'
                            className='form-control'
                            placeholder={language === 'English' ? 'Enter Name' : "الاسم"}
                            value={name}
                            onChange={e => setName(e.target.value)}

                        />

                    </div>
                    <div className='col-sm-12 col-md-6'>

                        <input
                            value={ar_name}
                            type='text'
                            placeholder={language === 'English' ? 'Enter Arabic Name' : " الاسم بالعربي"}
                            className='form-control'
                            onChange={e => setAraName(e.target.value)}
                        />

                    </div>
                    <div className='col-sm-12 col-md-6'>

                        <input
                            type='file'
                            className='form-control'
                            placeholder={language === 'English' ? 'Enter file' : "اختر الملف"}
                            onChange={e => setFile(e.target.files[0])}

                        />

                    </div>


                </div>
            </div>


            <button className='btn btn-success' onClick={() => editExistUser()}>{language === 'English' ? "Edit Category" : "تعديل صنف"}</button>
        </div>
    )
}

export default EditUser