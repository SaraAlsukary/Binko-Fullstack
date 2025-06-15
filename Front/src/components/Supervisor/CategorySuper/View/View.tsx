
import { useAppDispatch, useAppSelector } from '@hooks/app';
import actGetCategories from '@store/categorySlice/act/actGetCategories';
import { useEffect, useState } from 'react';



function View({ id }: { id: number }) {
    const dispatch = useAppDispatch();

    const { categories } = useAppSelector(state => state.categories);
    const categoryInfo = categories.find(cat => cat.id === id);
    const { language } = useAppSelector(state => state.language);
    const [name, setName] = useState(categoryInfo?.name);
    const [ar_name, setAraName] = useState(categoryInfo?.name_arabic);
    const [file, setFile] = useState(categoryInfo?.file);

    useEffect(() => {
        dispatch(actGetCategories())
    }, [language]);
    useEffect(() => {
        if (categories) {
            setName(categoryInfo?.name)
            setAraName(categoryInfo?.name_arabic)
            setFile(categoryInfo?.file!)

        }
    }, [categories]);


    return (
        <div className='user-view'>
            <div className='box'>
                <div className='row'>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'Category Name:' : "الاسم"}</span>
                            <span>{name}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'Arabic Name:' : " الاسم بالعربي"}</span>
                            <span>{ar_name}</span>
                        </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                        <p>
                            <span>{language === 'English' ? 'File:' : "الملف"}</span>
                            <video width='100' height='100' autoPlay loop >
                                <source src={`http://127.0.0.1:8000${file}`} type="video/webm" />
                            </video>

                        </p>
                    </div>

                </div>
            </div>



        </div>
    )
}

export default View