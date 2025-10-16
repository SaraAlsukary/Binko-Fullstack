import { useAppSelector } from "@hooks/app";
import { Container } from "react-bootstrap"
import './Subscription.css'
const Subscription = () => {
    const { language } = useAppSelector(state => state.language);
    const data = [
        { ar: "غص أعمق في كل قصة. قراءة بدون إعلانات", en: "Dive deeper into every story. Ad-free reading with Premium." },
        { ar: "سعة مفضلة لا محدودة", en: "Unlimited favorite capacity" },
        { ar: "استئناف القراءة من آخر سطر كنت تقرأه", en: "Checkpoint to return to the last line you were reading" },

    ]
    return (
        <Container className="sub d-flex flex-column justify-content-center align-items-center ">
            <div className="d-flex flex-column justify-content-center align-items-center pt-4 pb-4">
                <h2 className="font-weight-bold">{language === "English" ? "Unlock a world of stories, Read without limits, Your next favorite book is waiting!" : "افتح عالمًا من القصص، اقرأ بدون حدود، كتابك المفضل التالي ينتظرك!"}</h2>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center pt-4 pb-4">
                <p></p>
            </div>
        </Container>
    )
}

export default Subscription