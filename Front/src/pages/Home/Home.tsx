import { Landing } from "@components/common"
import TopBooks from '@pages/TopBooks/Books'
import { useAppSelector } from "@hooks/app";
import About from "@pages/About/About"
import News from "@pages/News/News"

const Home = () => {
    const { userData } = useAppSelector(state => state.auth);

    return (

        <>
            {userData ? <TopBooks /> : <Landing />}
            <News />
            <About />
        </>
    )
}

export default Home
