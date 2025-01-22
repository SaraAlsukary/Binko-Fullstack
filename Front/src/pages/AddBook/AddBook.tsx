import { Container } from "react-bootstrap"
import Styles from './AddBook.module.css';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import SecondaryButton from "@components/feedback/SecondaryButton/SecondaryButton";
import SecondaryInput from "@components/feedback/SecondaryInput/SecondaryInput";
import { addBook } from "@store/addBookSlice/addBookSlice";

const { addBooksContainer, cont, controlBtn, input, pic, img, bookInfo, } = Styles;
const AddBook = () => {
    const formData = new FormData;
    const formDataInfo = new FormData;
    const [imageFile, setImageFile] = useState(formData);
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    const { books } = useAppSelector(state => state.addBook);
    // const data = {
    //     id: Math.floor(Math.random()),
    //     image: imageFile,
    //     user: 'name',
    //     name,
    //     description
    // }

    console.log(books);

    const titleHandler = (e: any) => {
        setName(e.target.value);
    }
    const descHandler = (e: any) => {
        setDescription(e.target.value);
    }
    const imageHandler = (e: any) => {
        setImage(URL.createObjectURL(e.target.files[0]));
        formDataInfo.append('image', e.target.files[0]);
    }
    const addBookToMem = (data: Object) => {
        formDataInfo.append('name', name);
        formDataInfo.append('description', description);

        dispatch(addBook(formDataInfo));
        setDescription('');
        setImage('');
        setName('');
    }
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
                        <select name="" id="">
                            <option value="">Horror</option>
                            <option value="">Action</option>
                            <option value="">Advanture</option>
                            <option value="">Romance</option>
                            <option value="">Fantasy</option>
                        </select>
                    </div>
                </div>
                <div className={controlBtn}>
                    <SecondaryButton onClick={() => addBookToMem(formData)}>{language === 'English' ? 'Save' : 'حفظ'}</SecondaryButton>
                    <SecondaryButton>{language === 'English' ? 'Publish' : 'نشر'}</SecondaryButton>
                </div>
            </Container>
        </div >
    )
}

export default AddBook
