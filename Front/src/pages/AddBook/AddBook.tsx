import { Container } from "react-bootstrap"
import Styles from './AddBook.module.css';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import SecondaryButton from "@components/feedback/SecondaryButton/SecondaryButton";
import SecondaryInput from "@components/feedback/SecondaryInput/SecondaryInput";
import actAddBooks from "@store/booksSlice/act/actAddBooks";
import actGetCategories from "@store/categorySlice/act/actGetCategories";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const { addBooksContainer, cont, controlBtn, input, pic, mul, img, mulch, bookInfo, } = Styles;
const AddBook = () => {
    const dataForm = new FormData();
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    const { categories } = useAppSelector(state => state.categories);
    const navigate = useNavigate()
    var cate: any = [];
    const selectCate = (e: any) => {
        const catename = e.target.value;
        if (cate.find((catee: any) => catee === catename)) {
            cate = cate.filter((ca: any) => ca !== catename);


        } else {
            cate.push(catename)



        }


    }
    const titleHandler = (e: any) => {
        setName(e.target.value);
    }
    const descHandler = (e: any) => {
        setDescription(e.target.value);
    }
    const contentHandler = (e: any) => {
        setContent(e.target.value);

    }
    const imageHandler = (e: any) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        setImageFile(e.target.files[0])

    }




    const addBookHandler = () => {

        dataForm.append('image', imageFile)
        dataForm.append('name', name);
        dataForm.append('content', content);
        dataForm.append('description', description);
        cate.forEach((ca: any) => dataForm.append(`category_names`, ca))

        // for (let [key, value] of dataForm.entries()) {
        //     console.log(key, value)
        // }
        dispatch(actAddBooks(dataForm))
            .unwrap()
            .then(() => {
                language === 'English' ? toast.success('Your Book published successfully!') : toast.success('تم نشر كتابك بنجاح!')
                navigate(-2)


                setDescription('');
                setContent('');
                setImage('');
                setName('');
                setImageFile('')
            }
            )
    }
    const CategoriesSelects = categories.map((cate) =>
        <option key={cate?.id} onClick={selectCate} value={cate?.name}>
            {language === 'English' ? cate.name : cate.name_arabic}
        </option>
    )
    useEffect(() => {
        dispatch(actGetCategories())
    }, [])
    return (
        <div className={addBooksContainer}>

            <Container className={cont}>
                <div className={bookInfo}>
                    <div className={pic}>
                        <h2>{language === "English" ? "Add Image:" : "أضف صورة:"}</h2>
                        <input id="img" type="file" onChange={imageHandler} />
                        <label htmlFor="img">
                            <div className={img}>
                                <img src={image} />
                                <label htmlFor="img">
                                    <span>+</span>
                                </label>

                            </div>
                        </label>
                    </div>
                    <div className={input}>
                        <SecondaryInput onChange={titleHandler} type="text" placeholder={language === 'English' ? "Book Title" : "عنوان الكتاب"} />
                        <textarea name="" id="" onChange={descHandler} placeholder={language === 'English' ? "Book description" : "وصف الكتاب"} ></textarea>
                        <textarea name="" id="" onChange={contentHandler} placeholder={language === 'English' ? "Book Content" : "محتوى الكتاب"} ></textarea>
                        <div className="cate">{language === 'English' ? 'choose categories for your book: ' : 'اختر تصنيفات كتابك:'}</div>
                        <div className={mul}>
                            <select name="category_names" multiple id="">
                                {CategoriesSelects}

                            </select>
                        </div>

                    </div>
                </div>
                <div className={controlBtn}>
                    <SecondaryButton onClick={() => addBookHandler()}>{language === 'English' ? 'Publish' : 'نشر'}</SecondaryButton>
                </div>
            </Container>

        </div >
    )
}

export default AddBook
