import HeadingTitle from "@components/feedback/HeadingTitle/HeadingTitle"
import NotificationsList from "@components/Notifications/NotificationsList/NotificationsList"
import { useAppSelector } from "@hooks/app"
import { Container } from "react-bootstrap"

const Notifications = () => {
    const { language } = useAppSelector(state => state.language)
    return (
        <div className="notify">
            <Container>
                <HeadingTitle>{language === 'English' ? "Notifications" : "الاشعارات"}</HeadingTitle>

                <NotificationsList />
            </Container>
        </div>
    )
}

export default Notifications