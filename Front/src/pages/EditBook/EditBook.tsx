import { Container } from "react-bootstrap"
import Styles from './EditBook.module.css';
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import SecondaryButton from "@components/feedback/SecondaryButton/SecondaryButton";
import SecondaryInput from "@components/feedback/SecondaryInput/SecondaryInput";
import actGetCategories from "@store/categorySlice/act/actGetCategories";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import actEditBook from "@store/booksSlice/act/actEditBook";
import actGetMyBooks from "@store/booksSlice/act/actGetMyBooks";
import { TCategory } from "@customtypes/categoryType";


const { addBooksContainer, cont, controlBtn, input, pic, mul, img, mulch, bookInfo, } = Styles;
const EditBook = () => {
    const dataForm = new FormData();
    const { id } = useParams()
    const [image, setImage] = useState<string>('');
    const [imageFile, setImageFile] = useState<string>('');
    const [newImage, setNewImage] = useState<string>('');
    // const [category, setCategory] = useState([]);
    const [name, setName] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const dispatch = useAppDispatch();
    const { language } = useAppSelector(state => state.language);
    const { myBooks } = useAppSelector(state => state.books);
    const idx = parseInt(id as string)

    const book = myBooks.find(book => book.id === idx);
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
        setNewImage(URL.createObjectURL(e.target.files[0]))

    }




    const addBookHandler = () => {

        dataForm.append('id', id as string)
        dataForm.append('image', imageFile)
        dataForm.append('name', name);
        dataForm.append('content', content);
        dataForm.append('description', description);
        cate.forEach((ca: any) => dataForm.append(`category_names`, ca))

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
    }
    const CategoriesSelects = categories.map((cate) => {
       
        const newCate: TCategory = book?.categories?.find(ca => cate.name === ca)!;
        return (
            <option
                selected={newCate ? true : false}
                key={cate?.id} onClick={selectCate} value={cate?.name}>
            {language === 'English' ? cate.name : cate.name_arabic}
        </option>)
    }
    )
    useEffect(() => {
        dispatch(actGetCategories())
        dispatch(actGetMyBooks(idx))
    }, [language])
    useEffect(() => {
        if (book) {
            book.categories?.forEach((ca:string[]) =>
                cate.push(ca)
            )
            setContent(book?.content as string)
            setName(book?.name as string)
            setImage(book?.image as string)
            setImageFile(book?.image as string)
            setDescription(book?.description as string)
        }
    }, [book])

    return (
        <div className={addBooksContainer}>

            <Container className={cont}>
                <div className={bookInfo}>
                    <div className={pic}>
                        <h2>{language === "English" ? "Add Image:" : "أضف صورة:"}</h2>
                        <input id="img" type="file" onChange={imageHandler} />
                        <label htmlFor="img">
                            <div className={img}>
                                {newImage ?
                                  <img src={`${newImage}`} />
                                  :
                                  <img src={`http://127.0.0.1:8000/${image}`} />
                                }
                                <label htmlFor="img">
                                    <span>+</span>
                                </label>

                            </div>
                        </label>
                    </div>
                    <div className={input}>
                        <SecondaryInput value={name} onChange={titleHandler} type="text" placeholder={language === 'English' ? "Book Title" : "عنوان الكتاب"} />
                        <textarea value={description} name="" id="" onChange={descHandler} placeholder={language === 'English' ? "Book description" : "وصف الكتاب"} ></textarea>
                        <textarea value={content} name="" id="" onChange={contentHandler} placeholder={language === 'English' ? "Book Content" : "محتوى الكتاب"} ></textarea>
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

export default EditBook
