import {  useEffect, useState } from 'react'
import actAddCategory from '@store/categorySlice/act/actAddCategory';
import { useAppDispatch, useAppSelector } from '@hooks/app';
import toast from 'react-hot-toast';

function Add(props: { setUserAdded: () => void }) {
    const [file, setFile] = useState("");
    const [name, setName] = useState("");
    const [araName, setArName] = useState("");
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state=>state.language);
    const fileHandler = (e: any) => {
        setFile(e.target.files[0]);
    }
    const addNewUser = () => {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("name_arabic", araName);
        formdata.append("file", file);
    
        dispatch(actAddCategory(formdata)).unwrap().then(() => {
            toast.success('Added Successfully!')
            setFile('')
            setName('')
            setArName('')
        })
    }

    return (
        <div className='user-view _add-view'>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                  
                            <input
                                type='text'
                                className='form-control'
                                placeholder={language==='English'?'Enter Name':"الاسم"}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                      
                    </div>
                    <div className='col-sm-12 col-md-6'>
                    
                            <input
                                type='text'
                                className='form-control'
                                placeholder={language === 'English' ? 'Enter Arabic Name' : " الاسم بالعربي"}
                                value={araName}
                                onChange={e => setArName(e.target.value)}
                            />
                 
                    </div>
                    <div className='col-sm-12 col-md-6'>
                  
                            <input
                                type='file'
                                className='form-control'
                                placeholder={language === 'English' ? 'Enter file' : "اختر الملف"}
                                onChange={fileHandler}
                            />
                     
                    </div>

                </div>
            </div>

            <button className='btn btn-success' onClick={() => addNewUser()}>{language === 'English' ? "Add New Category":"أضف صنف جديد"}</button>
        </div>
    )
}

export default Add