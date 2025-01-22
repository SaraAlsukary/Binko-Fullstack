import { Col, Container, Row } from "react-bootstrap"
import ReactAudioPlayer from "react-audio-player";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Styles from './AddChapter.module.css';
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/app";
import SecondaryButton from "@components/feedback/SecondaryButton/SecondaryButton";
import SecondaryInput from "@components/feedback/SecondaryInput/SecondaryInput";
import { addChapter } from "@store/addChapterSlice/addChapterSlice";
import { Button } from "@components/feedback";
const modules = {
    toolbar: [
        [{
            header: [1, 2, 3, 4, 5, 6, false],

        }],
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
    ]
}
const { addBooksContainer, cont, rows, audioInput, editors, editorInput, controlBtn, audio, input } = Styles;
const AddChapter = () => {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [file, setFile] = useState('');
    const [audioFile, setAudioFile] = useState("");
    const { language } = useAppSelector(state => state.language);
    const dispatch = useAppDispatch();
    const data: Object = {
        file,
        title,
        value
    }
    const titleHandler = (e: any) => {
        setTitle(e.target.value);
    }
    const fileHandler = (e: any) => {
        setAudioFile(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    const addChapterToMem = (data: Object) => {
        dispatch(addChapter(data))
    }
    return (
        <div className={addBooksContainer}>
            <Container className={cont}>

                <div className={input}>
                    <SecondaryInput onChange={titleHandler} type="text" placeholder={language === 'English' ? "Chapter Title" : "عنوان الفصل"} />
                </div>
                <div className={audio}>
                    {!show && <Button onClick={() => setShow(true)}>{language === 'English' ? "Audio" : "صوت"}</Button>}
                    {show &&
                        <div className={audioInput}>
                            <input id='aud' type="file" onChange={fileHandler} />
                            <Button>  <label htmlFor="aud">{language === 'English' ? "Add" : "اضافة"}</label></Button>
                            {/* <audio controls>
                                <source src={audioFile} type="audio/ogg" />
                                <source src={audioFile} type="audio/mpeg" />
                                Your browser does not support the audio tag.
                            </audio> */}
                            <ReactAudioPlayer controls src={audioFile} />
                        </div>}
                </div>
                <Row className={rows}>
                    <Col className={editors}>
                        <ReactQuill className={editorInput} modules={modules}
                            theme="snow" value={value} onChange={setValue} />
                        {/* <div className={contentText} dangerouslySetInnerHTML={{ __html: value }} /> */}
                    </Col>
                </Row>
                <div className={controlBtn}>
                    <SecondaryButton onClick={() => addChapterToMem(data)}>{language === 'English' ? 'Save' : 'حفظ'}</SecondaryButton>
                    <SecondaryButton>{language === 'English' ? 'Publish' : 'نشر'}</SecondaryButton>
                </div>

            </Container>
        </div>
    )
}

export default AddChapter
