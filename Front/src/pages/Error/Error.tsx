import LottieHandler from "@components/feedback/lottieHandler/lottieHandler"
import { useAppSelector } from "@hooks/app"

const Error = () => {
    const { language } = useAppSelector(state => state.language)
    return (
        <LottieHandler style={{ width: '100px' }} className="d-flex flex-column justify-content-center align-items-center mt-4" type="Error" message={language === "English" ? "Ops, Error Occured!" : " للأسف، حدث خطأ!"} />
    )
}

export default Error