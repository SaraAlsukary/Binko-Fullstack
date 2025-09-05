import { useEffect, useState } from 'react'
import actUpdateCategory from '@store/categorySlice/act/actUpdateCategory';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import toast from 'react-hot-toast';
import { Localhost } from '@utils/localhost';


function EditUser({ id }: { id: number }) {
    const { categories } = useAppSelector(state => state.categories);
    const categoryInfo = categories.find(cat => cat.id === id);
    const [name, setName] = useState(categoryInfo?.name);
    const { language } = useAppSelector(state => state.language);
    const [image, setImage] = useState(`${Localhost}${categoryInfo?.file!}`);

    const [ar_name, setAraName] = useState(categoryInfo?.name_arabic);
    const [file, setFile] = useState<null | string | File>(categoryInfo?.file!);

    const dispatch = useAppDispatch();

    const editExistUser = async () => {
        const formdata = new FormData();
        formdata.append("name", name!)
        formdata.append("file", file as string)
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
    const fileHandler = (e: any) => {
        setFile(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]))

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
                    <div className='col-sm-12 col-md-12 mt-2 d-flex justify-content-center align-items-center'>
                        <label className='file-label' htmlFor="file">{language === 'English' ? 'Enter file' : "اختر الملف"}</label>
                        <input
                            type='file'
                            style={{ display: 'none' }}
                            id={'file'}
                            className='form-control'
                            placeholder={language === 'English' ? 'Enter file' : "اختر الملف"}
                            onChange={fileHandler}

                        />
                        <img src={image} alt="" />  
                        </div>


                </div>
            </div>


            <button className='btn btn-success' onClick={() => editExistUser()}>{language === 'English' ? "Edit Category" : "تعديل صنف"}</button>
        </div>
    )
}

export default EditUser