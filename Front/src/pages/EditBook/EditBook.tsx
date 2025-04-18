import { Container } from "react-bootstrap"
import Styles from './EditBook.module.css';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import SecondaryButton from "@components/feedback/SecondaryButton/SecondaryButton";
import SecondaryInput from "@components/feedback/SecondaryInput/SecondaryInput";
import actAddBooks from "@store/booksSlice/act/actAddBooks";
import actGetCategories from "@store/categorySlice/act/actGetCategories";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import actEditBook from "@store/booksSlice/act/actEditBook";


const { addBooksContainer, cont, controlBtn, input, pic, mul, img, mulch, bookInfo, } = Styles;
const EditBook = () => {
    const dataForm = new FormData();
    const { id } = useParams()
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    // const [category, setCategory] = useState([]);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    // const { user } = useAppSelector(state => state.auth);
    const { books } = useAppSelector(state => state.books);
    const { categories } = useAppSelector(state => state.categories);
    const navigate = useNavigate()
    var cate: any = [];
    // const categoryHandler = (e: any) => {
    //     const id = parseInt(e.target.value);
    //     console.log(id)
    //     if (category.find((cate: any) => cate == e.target.value)) {
    //         // if (category.find((cate: any) => cate === id)) {
    //         // console.log('exist')
    //         // console.log(id)
    //         const cate = category.filter(cate => cate != e.target.value);
    //         setCategory(cate);
    //         console.log(category)

    //     } else {
    //         // const categoryItem = categories.find(cate => cate.id == id)
    //         setCategory([...category, e.target.value])
    //         console.log(category)

    //         // setCategory([...category, id])

    //     }
    // }
    const selectCate = (e: any) => {
        const catename = e.target.value;
        if (cate.find((catee: any) => catee === catename)) {
            // if (category.find((cate: any) => cate === id)) {
            // console.log('exist')
            // console.log(id)

            cate = cate.filter((ca: any) => ca !== catename);

            console.log(cate)

        } else {
            // const categoryItem = categories.find(cate => cate.id == id)
            cate.push(catename)

            console.log(cate)

            // setCategory([...category, id])

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
        // dataForm.append('image', e.target.files[0])
        setImageFile(e.target.files[0])
        // console.log(e.target.files[0])

    }




    const addBookHandler = () => {

        // console.log(cate)
        // console.log(category)
        // setCategory(cate)
        dataForm.append('id', id)
        dataForm.append('image', imageFile)
        dataForm.append('name', name);
        dataForm.append('content', content);
        dataForm.append('description', description);
        cate.forEach((ca: any) => dataForm.append(`category_names`, ca))
        // dataForm.append(`category_names`, JSON.stringify(cate))

        for (let [key, value] of dataForm.entries()) {
            console.log(key, value)
        }
        dispatch(actEditBook(dataForm))
            .unwrap()
            .then(() => {
                language === 'English' ? toast.success('Your Book edited successfully!') : toast.success('تم تعديل كتابك بنجاح!')
                navigate(-2)


            }
            )
        setDescription('');
        setContent('');
        setImage('');
        setName('');
        setImageFile('');
        // // setCategory([])
    }
    const CategoriesSelects = categories.map((cate) =>
        // <div key={cate.id} className={mulch}>
        //     <input onClick={categoryHandler} type="checkbox" value={cate.id} id={cate.name} />
        //     <label htmlFor={cate.name}>{language === 'English' ? cate.name : cate.name_arabic}</label>
        // </div>
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

                            {/* <div className={mulch}>
                                <input onClick={categoryHandler} type="checkbox" value={1} id="Action" />
                                <label htmlFor="Action" >Action</label>
                            </div>
                            <div className={mulch}>
                                <input type="checkbox" onClick={categoryHandler} value={2} id="Advanture" />
                                <label htmlFor="Advanture" >Advanture</label>
                            </div>
                            <div className={mulch}>
                                <input type="checkbox" onClick={categoryHandler} value={3} id="Romance" />
                                <label htmlFor="Romance" >Romance</label>
                            </div>
                            <div className={mulch}>
                                <input type="checkbox" onClick={categoryHandler} value={4} id="Fantasy" />
                                <label htmlFor="Fantasy" >Fantasy</label>
                            </div> */}
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

export default EditBook
