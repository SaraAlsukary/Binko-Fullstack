import { Button, Input } from "@components/feedback"
import HeadingTitle from "@components/feedback/HeadingTitle/HeadingTitle"
import { useAppDispatch, useAppSelector } from "@hooks/app"

import actGetComments from "@store/commentsSlice/act/actGetComments"
import actAddReply from "@store/repliesSlice/act/actAddReply"
import actGetReplyByComment from "@store/repliesSlice/act/actGetReplyByComment"
import { useEffect, useState } from "react"
import Send from '@assets/svgs/send.svg?react';
import SendArabic from '@assets/svgs/sendArabic.svg?react';
import { Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import Style from './Comments.module.css'
import actDeleteComment from "@store/commentsSlice/act/actDeleteComment"
import toast from "react-hot-toast"
import actDeleteReply from "@store/repliesSlice/act/actDeleteReply"
import { TReplies } from "@customtypes/replyType"
import Error from "@pages/Error/Error"
import { Localhost } from "@utils/localhost"
import actAddReplyToReply from "@store/repliesSlice/act/actAddReplyToReply"
const { pic, boxCont, commentBtns, reply, replyBox, replyer, replyerName, replyList, commenter, commenterName,
    text, inputField, comments, icon, input, box, active, commentsList } = Style;

const initialStateReplies: TReplies[] = [{
    children: [],
    content: "",
    created_at: "",
    id: 0,
    name: "",
    image: '',
    parent: null,
    parent_name: null,
    user: 0
}]
const Comments = () => {
    const [replyy, setReplyy] = useState('');
    const [replyId, setReplyId] = useState<null | number>(null);
    const [repliesState, setRepliesState] = useState<TReplies[]>(initialStateReplies);
    const { replies } = useAppSelector(state => state.replies)
    const navigate = useNavigate()
    const { userData } = useAppSelector(state => state.auth)
    const { language } = useAppSelector(state => state.language)
    const commentss = useAppSelector(state => state.comments.comments)
    const { error } = useAppSelector(state => state.comments)
    const { idComment } = useParams()
    const dispatch = useAppDispatch()
    const IdCom = parseInt(idComment as string)
    const comment = commentss.find((c) => c.id === IdCom)
    // const repliesList = 
    const deleteCommentHandler = (id: number) => {
        dispatch(actDeleteComment(id)).unwrap().then(() => {
            language === 'English' ? toast.success('Deleted successfully!') : toast.success('تم الحذف بنجاح!')
        })
        navigate(-1)
    }
    const deleteReplyHandler = (id: number) => {
        dispatch(actDeleteReply(id)).unwrap().then(() => {
            language === 'English' ? toast.success('Deleted successfully!') : toast.success('تم الحذف بنجاح!')
        })
    }

    if (error !== null)
        return <Error />

    interface IRep {
        user: number,
        comment: number,
        content: string
    }
    interface IRepOnRep {
        rep: number,
        user: number,
        comment: number,
        content: string
    }
    const ReplyData: IRep = {
        user: userData?.user?.id!,
        comment: IdCom,
        content: replyy

    }
    const ReplyToReplyData: IRepOnRep = {
        rep: replyId!,
        user: userData?.user?.id!,
        comment: IdCom,
        content: replyy

    }
    const addReplyHandler = () => {
        console.log(ReplyData)
        dispatch(actAddReply(ReplyData)).unwrap().then(() => {
            toast.success(language === 'English' ? "your reply added successfully!" : "تم اضافة ردك بنجاح!")
        })
        setReplyy('');
    }
    const addRepOnRep = (id: number) => {
        setReplyId(id)
        console.log(ReplyToReplyData)
        dispatch(actAddReplyToReply(ReplyToReplyData))
            .unwrap().then(() => {
                toast.success(language === 'English' ? "your reply added successfully!" : "تم اضافة ردك بنجاح!")
            })
        setReplyy('');

    }
    const unactiveInputHandler = () => {
        document.body.addEventListener('click', (e: any) => {
            if (e.target.className !== null)
                var nameCLass = e.target.className;


            var inp = document.getElementById(`inp-${nameCLass}`);
            var span = document.getElementById(`span-${nameCLass}`);
            var inpActive = document.querySelector(`.${inputField}.${active}`);
            var spanActive = document.querySelector(`span.${active}`);

            if (span?.contains(e.target) || inpActive?.contains(e.target)) {
                inp?.classList.add(active);
                span?.classList.add(active);
            } else if (!spanActive?.contains(e.target)) {
                inpActive?.classList.remove(active);
                spanActive?.classList.remove(active);

            }
        })
    }
    unactiveInputHandler();

    const commentsListElements =
        <div key={comment?.id} className={boxCont}>
            <div className={box}>
                <div className={commenter}>
                    <div onClick={() =>
                        // navigate(`/Binko/userInfo/${comment?.user}`)
                        console.log('')

                    }
                        className={pic}>
                        <img src={`${Localhost}${comment?.image}`} alt="" />
                    </div>
                    <div onClick={() =>
                        // navigate(`/Binko/userInfo/${comment?.user}`)
                        console.log('')
                    }
                        className={commenterName}>
                        {comment?.name}
                    </div>
                </div>
                <div className={text}>
                    <p>{comment?.comment} <span
                        className={`${comment?.id}`}
                        id={`span-${comment?.id}`}
                    >{language === 'English' ? `REPLY` : `الرد`}</span></p>
                </div>
                {

                    (comment?.user === userData?.user.id || userData?.user.is_admin || userData?.user.is_supervisor) ?
                        <div className={commentBtns}>

                            <Button
                                onClick={() => deleteCommentHandler(comment?.id!)}
                                style={{ width: '60px', margin: "10px", backgroundColor: "#f35151" }}>{language === 'English' ? 'Delete' : 'حذف'}</Button>
                        </div> : ""
                }
                <div
                    className={` ${inputField}`}
                    id={`inp-${comment?.id}`} >
                    <div className={input}>
                        <Input onChange={(e) => {
                            // setCommentId(comment?.id!)
                            setReplyy(e.target.value)
                        }} type="text" placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
                    </div>
                    <div className={icon} onClick={addReplyHandler}>
                        {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
                    </div>
                </div>
            </div>
            {repliesState.length > 0 ? <div className={`${replyList} ${reply}-${comment?.id} ${active}`}>
                {repliesState?.map((rep, idx) => {
                    return (
                        <div key={idx}>
                            <div className={replyBox}>
                                <div className={replyer}>
                                    <div className={pic}>
                                        <img src={`${Localhost}${rep?.image}`} alt="" />
                                    </div>
                                    <div className={replyerName}>
                                        {rep?.name}
                                    </div>
                                </div>
                                <div className={text}>
                                    <p>{rep?.content} <span
                                        className={`${rep?.id}`}
                                        id={`span-${rep?.id}`}
                                    >{language === 'English' ? `REPLY` : `الرد`}</span></p>
                                </div>
                                {

                                    (rep.user === userData?.user.id || userData?.user.is_admin || userData?.user.is_supervisor) ?
                                        <div className={commentBtns}>
                                            <Button
                                                onClick={() => deleteReplyHandler(rep?.id!)}
                                                style={{ width: '60px', margin: "10px", backgroundColor: "#f35151" }}>{language === 'English' ? 'Delete' : 'حذف'}</Button>
                                        </div> : ""
                                }
                                <div
                                    className={` ${inputField}`}
                                    id={`inp-${rep?.id}`} >
                                    <div className={input} >
                                        <Input onFocus={() => setReplyId(rep.id)} onChange={(e) => {
                                            setReplyy(e.target.value)
                                        }} type="text" placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
                                    </div>
                                    <div onClick={() => addRepOnRep(rep.id)} className={icon}>
                                        {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
                                    </div>
                                </div>
                            </div>

                            {
                                rep.children?.length ?
                                    rep.children?.map((rep, idx) => {
                                        return (
                                            <>
                                                <div key={idx} className={replyBox}>
                                                    <div className={replyer}>
                                                        <div className={pic}>
                                                            <img src={`${Localhost}${rep?.image}`} alt="" />
                                                        </div>
                                                        <div className={replyerName}>
                                                            {rep?.name}
                                                        </div>
                                                    </div>
                                                    <div className={text}>
                                                        <div className={replyerName} id="parent">
                                                            @{rep?.parent_name}
                                                        </div>
                                                        <p>{rep?.content} <span
                                                            className={`${rep?.id}`}
                                                            id={`span-${rep?.id}`}
                                                        >{language === 'English' ? `REPLY` : `الرد`}</span></p>
                                                    </div>
                                                    {

                                                        (rep?.user === userData?.user.id || userData?.user.is_admin || userData?.user.is_supervisor) ?
                                                            <div className={commentBtns}>
                                                                {/* {ExistedComment ? <Button style={{ width: '60px', }}>{language === 'English' ? 'Edit' : 'تعديل'}</Button> : ""} */}
                                                                <Button
                                                                    onClick={() => deleteReplyHandler(rep?.id)}
                                                                    style={{ width: '60px', margin: "10px", backgroundColor: "#f35151" }}>{language === 'English' ? 'Delete' : 'حذف'}</Button>
                                                            </div> : ""
                                                    }
                                                    <div
                                                        className={` ${inputField}`}
                                                        id={`inp-${rep?.id}`} >
                                                        <div className={input} >
                                                            <Input onFocus={() => setReplyId(rep.id)} onChange={(e) => {
                                                                setReplyy(e.target.value)
                                                            }} type="text" placeholder={language === 'English' ? `Write a Comment...` : `اكتب تعليقاً...`} />
                                                        </div>
                                                        <div onClick={() => addRepOnRep(rep.id)} className={icon}>
                                                            {language === 'English' ? <Send style={{ width: '30px' }} /> : <SendArabic style={{ width: '30px' }} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>)
                                    })
                                    : ""}
                        </div>
                    )
                })}


            </div> : ''}
        </div >

    useEffect(() => {
        dispatch(actGetComments())
    }, [])

    useEffect(() => {
        dispatch(actGetReplyByComment(IdCom))
    }, [IdCom])
    useEffect(() => {
        if (replies) {
            setRepliesState(replies)
        }
    }, [replies, dispatch])

    return (
        <Container>
            <HeadingTitle>
                Comments
            </HeadingTitle>
            <div className={comments}>
                <div id="com" className={commentsList}>

                    {commentsListElements}
                </div>
            </div>
        </Container>
    )
}

export default Comments
