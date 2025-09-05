import LottieHandler from "@components/feedback/lottieHandler/lottieHandler"
import Header from "@components/Waiting/Header/Header"
import { useAppSelector } from "@hooks/app"
import { Container } from "react-bootstrap"
import './Waiting.css'
const Waiting = () => {
  const { createdAccount } = useAppSelector(state => state.auth)
  const { language } = useAppSelector(state => state.language)
  return (
    <Container>
      <Header />
      <div className="wait">
        <LottieHandler className="waitLottie" style={{ width: "500px" }} type="Waiting" loop={true} message={language === 'English' ? `Welcome To Binko Community ${createdAccount?.user.name}, Please wait for the supervisors' approval of your account...`
          : `أهلاً بك بمجتمع بينكو ${createdAccount?.user.name}، أرجوك انتظر حتى تتم موافقة المشرفين على حسابك...`} />

      </div>
    </Container>
  )
}

export default Waiting