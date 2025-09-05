import HeadingTitle from "@components/feedback/HeadingTitle/HeadingTitle"
import NotificationsList from "@components/Notifications/NotificationsList/NotificationsList"
import { useAppDispatch, useAppSelector } from "@hooks/app"
import actReadNotifications from "@store/notifications/act/actReadNotificationsts"
import { useEffect } from "react"
import { Container } from "react-bootstrap"

const Notifications = () => {
    const { language } = useAppSelector(state => state.language)
    const { userData } = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actReadNotifications(userData?.user.id!))
    }, [])
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