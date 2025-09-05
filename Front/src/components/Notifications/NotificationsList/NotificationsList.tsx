import { useEffect } from "react"
import NotificationCard from "../NotificationCard/NotificationCard"
import './NotificationsList.css'
import actGetNotificationsList from "@store/notifications/act/actGetNotificationsList"
import { useAppDispatch, useAppSelector } from "@hooks/app"
const NotificationsList = () => {
  const dispatch = useAppDispatch()
  const { notifications } = useAppSelector(state => state.notifications)
  const { language } = useAppSelector(state => state.language)
  const { userData } = useAppSelector(state => state.auth)

  const NotificationsData = notifications.map(n => <NotificationCard key={n.id} {...n} />)
  useEffect(() => {
    dispatch(actGetNotificationsList(userData?.user.id!))
  }, [])
  return (
    <div className="notifyList">
      {notifications.length ? NotificationsData : language === 'English' ? "There is no notifications" : "لا يوجد اشعارات"}
    </div>
  )
}

export default NotificationsList