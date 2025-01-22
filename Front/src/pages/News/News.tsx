import { Container } from 'react-bootstrap';
import img1 from '@assets/imgs/illustration-bookshelf-with-books_961004-3667.avif'
import img2 from '@assets/imgs/night-adventure-with-fairy-glowing-object-generative-ai_188544-12605.avif'
import img3 from '@assets/imgs/91YVYOjfbgL.jpg'
import Style from './News.module.css';
import { useAppSelector } from '@hooks/app';
const { NewsContainer, news, news2, cards2, pic, left, right, cards, pic2, pic3 } = Style
const News = () => {
    const { language } = useAppSelector(state => state.language);

    return (
        <div className={NewsContainer}>
            <Container>
                <div className={news}>
                    <div className={pic}>
                        <img src={img1} alt="" />
                    </div>
                    <div className={cards}>
                        <div className={left}>
                            <h2>{language === 'English' ? 'Our News' : 'أخبارنا'}</h2>
                            <p>{language === 'English' ? 'Online story platform Binko has introduced a new ways for authors to create their own stories and books with easy way, the new version is now being suitable for languages and users, comments become more realistic!' : 'قدمت منصة القصص عبر الإنترنت Binko طرقًا جديدة للمؤلفين لإنشاء قصصهم وكتبهم الخاصة بطريقة سهلة، أصبح الإصدار الجديد الآن مناسبًا للغات والمستخدمين، وأصبحت التعليقات أكثر واقعية!'}</p>
                        </div>
                        <div className={right}>
                            <h2>{language === 'English' ? 'what makes Binko unique?' : 'مالذي يجعل بينكو مميزاً؟'}</h2>
                            <p>{language === 'English' ? "Binko is home to 90+ million readers and writers who connect through the power of story, making it the world's most loved social storytelling platform. It's a place for new creators to write and share their stories, and for readers to connect with the stories they love" : "يعد بينكو موطنًا لأكثر من 90 مليون قارئ وكاتب يتواصلون من خلال قوة القصة، مما يجعله منصة سرد القصص الاجتماعية الأكثر شعبية في العالم. إنه مكان للمبدعين الجدد لكتابة قصصهم ومشاركتها، وللقراء للتواصل مع القصص التي يحبونها"}</p>
                        </div>
                    </div>
                </div>
                <hr />
                <div className={news2}>
                    <div className={pic2}>
                        <img src={img2} alt="" />
                        <p>{language === 'English' ? " Binko makes the world of writing a living world that the writer and reader can access and live within" : "بينكو يجعل عالم الكتابة عالما معاشا يستطيع الكاتب والقارئ الولوج له والعيش بداخله"}</p>

                    </div>

                    <div className={cards2}>
                        <div className={left}>
                            <h2>{language === 'English' ? 'Our World' : 'عالمنا'}</h2>
                            <p>{language === 'English' ? " You can make Binko another world that you discover through the books and stories written by writers and users with whom you can interact and critique their work. This makes you experience a special experience that only exists in the Binko community." : "يمكنك أن تجعل بينكو عالما اخر تكتشفه من خلال الكتب والقصص التي يكتبوهم كتاب ومستخدمين يمكنك التفاعل معهم ونقد أعمالهم ذلك يجعلك تخوض تجربة خاصة لا توجد الا في مجتمع بينكو"}</p>

                        </div>
                    </div>
                </div>
                <hr />
                <div className={pic3}>
                    <img src={img3} alt="" />
                    <span></span>
                    <p>{language === 'English' ? "Binko offers you a huge library of user books that you can bookmark as favorites in your own library. What are you waiting for, go and create your own library!" : "بينكو يقدم لك مكتبة هائلة من كتب المستخدمين والتي يمكنك جعلها كمرجع لك في مكتبتك الخاصة كمفضلة ماذا تنتظر اذهب وأنشئ مكتبتك الخاصة!"}</p>

                </div>
            </Container>
        </div>
    )
}

export default News
