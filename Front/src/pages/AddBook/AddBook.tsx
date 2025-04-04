import { Container } from "react-bootstrap"
import Styles from './AddBook.module.css';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import SecondaryButton from "@components/feedback/SecondaryButton/SecondaryButton";
import SecondaryInput from "@components/feedback/SecondaryInput/SecondaryInput";
import actAddBooks from "@store/booksSlice/act/actAddBooks";
import actGetCategories from "@store/categorySlice/act/actGetCategories";
import { TCategory } from "@customtypes/categoryType";

const { addBooksContainer, cont, controlBtn, input, pic, mul, img, mulch, bookInfo, } = Styles;
const AddBook = () => {
    const dataForm = new FormData();
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [category, setCategory] = useState<number[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    // const { user } = useAppSelector(state => state.auth);
    const { books } = useAppSelector(state => state.books);
    const { categories } = useAppSelector(state => state.categories);

    var cate: any = [];
    const categoryHandler = (e: any) => {
        const id = parseInt(e.target.value);
        console.log(id)
        if (category.find((cate: any) => cate === id)) {
            // if (category.find((cate: any) => cate === id)) {
            // console.log('exist')
            // console.log(id)
            const cate = category.filter(cate => cate !== id);
            setCategory(cate);
            console.log(category)

        } else {
            // const categoryItem = categories.find(cate => cate.id == id)
            setCategory([...category, id])
            console.log(category)

            // setCategory([...category, id])

        }
    }
    const titleHandler = (e: any) => {
        setName(e.target.value);
    }
    const descHandler = (e: any) => {
        setDescription(e.target.value);
    }
    const imageHandler = (e: any) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        // dataForm.append('image', e.target.files[0])
        setImageFile(e.target.files[0])
        // console.log(e.target.files[0])

    }
    const addBookHandler = () => {
        // setCategory(cate);
        dataForm.append('image', imageFile)
        dataForm.append('name', name);
        dataForm.append('description', description);
        dataForm.append('categories', category);
        console.log(dataForm.get("categories"))
        console.log(dataForm.get("name"))
        // dataForm.append('user_id', user?.user_id);
        // console.log(dataForm)
        // console.log(imageFile)
        dispatch(actAddBooks(dataForm))
            .unwrap()
            .then(() => alert(language === 'English' ? 'Your Book published successfully!' : "تم نشر كتابك بنجاح!"))
        setDescription('');
        setImage('');
        setName('');
        setImageFile('')
        setCategory([])
        console.log(books)
    }
    const CategoriesSelects = categories.map((cate) =>
        <div key={cate.id} className={mulch}>
            <input onClick={categoryHandler} type="checkbox" value={cate.id} id={cate.name} />
            <label htmlFor={cate.name}>{language === 'English' ? cate.name : cate.name_arabic}</label>
        </div>)
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
                        <div className="cate">{language === 'English' ? 'choose categories for your book: ' : 'اختر تصنيفات كتابك:'}</div>
                        <div className={mul}>
                            {CategoriesSelects}
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

export default AddBook
