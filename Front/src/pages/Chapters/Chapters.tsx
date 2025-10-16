import { useAppDispatch, useAppSelector } from '@hooks/app';
import style from './Chapters.module.css';
import { useParams } from 'react-router-dom';
import ReactAudioPlayer from "react-audio-player";
import 'react-quill/dist/quill.snow.css';
import { Container } from 'react-bootstrap';
import { useEffect, useRef, useState } from 'react';
import ChapterMenu from '@components/Chapters/ChapterMenu/ChapterMenu';
import { Button } from '@components/feedback';
import Loading from '@pages/Loading/Loading';
import Error from '@pages/Error/Error';
import actShowChapter from '@store/chaptersSlice/act/actShowChapter';
import actGetChapters from '@store/chaptersSlice/act/actGetChapters';
import { Localhost } from '@utils/localhost';
import toast from 'react-hot-toast';

const { text, down, chapterCont } = style;

const Chapters = () => {
    const [scrollValue, setScrollValue] = useState<null | number>(null);
    const { loading, error, chapter } = useAppSelector(state => state.chapters);
    const { checkpoint } = useAppSelector(state => state.checkpoint);
    const { language } = useAppSelector(state => state.language);
    const dispatch = useAppDispatch();
    const param: any = useParams();
    const contentRef = useRef(null);
    const index = parseInt(param.idChapter);
    const idBook = parseInt(param.id);

    // State declarations must be at the top
    const [devToolsOpen, setDevToolsOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [hasRestoredScroll, setHasRestoredScroll] = useState(false);

    useEffect(() => {
        const promise1 = dispatch(actShowChapter(index))
        const promise2 = dispatch(actGetChapters(idBook))
        return () => {
            promise1.abort()
            promise2.abort()
        }
    }, [dispatch, index, idBook])

    // Restore scroll position when checkpoint changes
    useEffect(() => {
        if (checkpoint && !hasRestoredScroll) {
            // Convert percentage to actual pixel position
            const documentHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPosition = (checkpoint / 100) * documentHeight;

            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });

            setHasRestoredScroll(true);
            setScrollValue(checkpoint);
        }
    }, [checkpoint, hasRestoredScroll]);

    // Alternative approach: Restore scroll on component mount
    useEffect(() => {
        if (checkpoint && !hasRestoredScroll) {
            // Small timeout to ensure DOM is fully rendered
            const timer = setTimeout(() => {
                const documentHeight = document.body.scrollHeight - window.innerHeight;
                const scrollPosition = (checkpoint / 100) * documentHeight;

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'auto'
                });

                setHasRestoredScroll(true);
                setScrollValue(checkpoint);
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [checkpoint, hasRestoredScroll]);

    useEffect(() => {
        // منع النسخ
        const handleCopy = (e: Event) => {
            e.preventDefault();
            toast.error(language === 'English' ? 'Copying is not allowed' : 'النسخ غير مسموح');
            return false;
        };

        // إضافة Event Listeners
        document.addEventListener('copy', handleCopy);
        document.addEventListener('cut', handleCopy);
        document.addEventListener('contextmenu', handleCopy);

        // حماية إضافية باستخدام MutationObserver
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'characterData') {
                    // منع تعديل النص
                    mutation.target.data = mutation.oldValue;
                }
            });
        });

        if (contentRef.current) {
            observer.observe(contentRef.current, {
                characterData: true,
                subtree: true,
                characterDataOldValue: true
            });
        }

        return () => {
            document.removeEventListener('copy', handleCopy);
            document.removeEventListener('cut', handleCopy);
            document.removeEventListener('contextmenu', handleCopy);
            observer.disconnect();
        };
    }, [language]);

    useEffect(() => {
        // كشف أدوات التقاط الشاشة والتسجيل
        const handleKeyDown = (e: any) => {
            // منع استخدام مفاتيح الاختصار للتقاط الشاشة
            if (
                (e.ctrlKey && e.key === 'PrintScreen') ||
                e.key === 'PrintScreen' || e.altKey || e.ctrlKey ||
                e.winKey || e.shiftKey || (e.key === 'Meta' || e.key === 'OS'
                    || e.code.includes('Meta') ||
                    (e.altKey && e.key === 'PrintScreen')
                )) {
                e.preventDefault();
                toast.error(language === 'English' ? 'Screen capturing is not allowed on this site' : 'التقاط الشاشة غير مسموح في هذا الموقع');
                return false;
            }

            // منع فتح أدوات المطورين
            if (
                e.key === 'F12' ||
                (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                (e.ctrlKey && e.key === 'u')
            ) {
                e.preventDefault();
                toast.error(language === 'English' ? 'Dev Tools is not allowed on this site' : "أدوات المطورين غير مسموح بها في هذا الموقع")
                return false;
            }
        };

        // منع النقر الأيمن
        const handleContextMenu = (e: Event) => {
            e.preventDefault();
            return false;
        };

        // منع السحب والإفلات
        const handleDragStart = (e: Event) => {
            e.preventDefault();
            return false;
        };

        // منع النسخ
        const handleCopy = (e: Event) => {
            e.preventDefault();
            toast.error(language === 'English' ? 'Copying is not allowed' : 'النسخ غير مسموح');
            return false;
        };

        // كشف أدوات المطورين
        const detectDevTools = () => {
            const widthThreshold = 160;
            const heightThreshold = 160;

            if (
                window.outerWidth - window.innerWidth > widthThreshold ||
                window.outerHeight - window.innerHeight > heightThreshold
            ) {
                setDevToolsOpen(true);
            } else {
                setDevToolsOpen(false);
            }
        };

        // إضافة مستمعي الأحداث
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('dragstart', handleDragStart);
        document.addEventListener('copy', handleCopy);

        // التحقق من أدوات المطورين بشكل دوري
        const devToolsInterval = setInterval(detectDevTools, 1000);

        // كشف تغيير حجم النافذة
        let lastWidth = window.innerWidth;
        const handleResize = () => {
            if (window.innerWidth !== lastWidth) {
                detectDevTools();
            }
            lastWidth = window.innerWidth;
        };

        window.addEventListener('resize', handleResize);

        // تنظيف المستمعين عند إلغاء التثبيت
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('dragstart', handleDragStart);
            document.removeEventListener('copy', handleCopy);
            window.removeEventListener('resize', handleResize);
            clearInterval(devToolsInterval);
        };
    }, [language]);

    // All conditional returns must happen AFTER all hooks
    if (devToolsOpen) {
        return (
            <div className="dev-tools-warning">
                {language === 'English' ? "Dev tools doesn't allowed ⚠️ " : " ⚠️ تم اكتشاف أدوات المطورين. هذا الموقع محمي من الفحص."}
            </div>
        );
    }

    if (loading === 'pending')
        return <Loading />

    if (error !== null)
        return <Error />

    return (
        <Container ref={contentRef} className={chapterCont}>
            <ChapterMenu />

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '20px'
            }}>
                {!show && chapter?.audio ? <Button onClick={() => setShow(true)}>{language === 'English' ? "Audio" : "صوت"}</Button> : ""}
                {show && chapter?.audio ?
                    <ReactAudioPlayer controls src={`${Localhost}${chapter?.audio}`} />
                    : ""}
            </div>
            <div className={down}>
                <div className={text}>
                    <h1>{chapter?.title}</h1>
                    <div className={'contentText'} dangerouslySetInnerHTML={{ __html: chapter?.content_text! }} />
                </div>
            </div>
        </Container>
    )
}

export default Chapters