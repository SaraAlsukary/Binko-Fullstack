import { Container } from "react-bootstrap"
import Styles from './AddBook.module.css';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import SecondaryButton from "@components/feedback/SecondaryButton/SecondaryButton";
import SecondaryInput from "@components/feedback/SecondaryInput/SecondaryInput";
import { addBook } from "@store/addBookSlice/addBookSlice";
import { useParams } from "react-router-dom";

const { addBooksContainer, cont, controlBtn, input, pic, img, bookInfo, } = Styles;
const UpdateBook = () => {
    const id: any = useParams();
    const { user } = useAppSelector(state => state.auth);
    const { books } = useAppSelector(state => state.addBook);
    const myBook = books.find((book) => book.id == id.id)
    console.log(id.id)
    const [imageFile, setImageFile] = useState();
    const [image, setImage] = useState(myBook?.image);
    const [category, setCategory] = useState(myBook?.category);
    const [name, setName] = useState(myBook?.name);
    const [description, setDescription] = useState(myBook?.description);
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    const data = {
        user: user?.user_id,
        image: image,
        name,
        description,
        category: category
    }

    console.log(books);

    const titleHandler = (e: any) => {
        setName(e.target.value);
    }
    const descHandler = (e: any) => {
        setDescription(e.target.value);
    }
    const imageHandler = (e: any) => {
        setImage(URL.createObjectURL(e.target.files[0]));
    }
    const addBookToMem = (data: Object) => {

        dispatch(addBook({ ...data, id: Math.floor(Math.random() * 100) }));
        setDescription('');
        setImage('');
        setName('');
        setCategory(0)
    }
    console.log(myBook?.image)
    return (
        <div className={addBooksContainer}>
            <Container className={cont}>
                <div className={bookInfo}>
                    <div className={pic}>
                        <h2>{language === "English" ? "Add Image:" : "أضف صورة:"}</h2>
                        <input id="img" type="file" onChange={imageHandler} />
                        <label htmlFor="img">
                            <div className={img}>
                                <img src={image} crossOrigin="anonymous" />
                                <label htmlFor="img">
                                    <span>+</span>
                                </label>

                            </div>
                        </label>
                    </div>
                    <div className={input}>
                        <SecondaryInput value={name} onChange={titleHandler} type="text" placeholder={language === 'English' ? "Book Title" : "عنوان الكتاب"} />
                        <textarea value={description} name="" id="" onChange={descHandler} placeholder={language === 'English' ? "Book description" : "وصف الكتاب"} ></textarea>
                        <select value={category} onChange={(e: any) => setCategory(e.target.value)} name="" id="">
                            <option value={1}>Horror</option>
                            <option value={2}>Action</option>
                            <option value={3}>Advanture</option>
                            <option value={4}>Romance</option>
                            <option value={5}>Fantasy</option>
                        </select>
                    </div>
                </div>
                <div className={controlBtn}>
                    <SecondaryButton onClick={() => addBookToMem(data)}>{language === 'English' ? 'Save' : 'حفظ'}</SecondaryButton>
                    <SecondaryButton>{language === 'English' ? 'Publish' : 'نشر'}</SecondaryButton>
                </div>
            </Container>
        </div >
    )
}

export default UpdateBook
