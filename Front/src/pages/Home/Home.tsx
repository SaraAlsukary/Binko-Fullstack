import { Landing } from "@components/common"
import TopBooks from '@pages/TopBooks/Books'
import { useAppSelector } from "@hooks/app";
import About from "@pages/About/About"
import News from "@pages/News/News"
import TopReadingsBooks from "@pages/TopReadingsBooks/TopReadingsBooks";
import LastBooks from "@pages/LastBooks/LastBooks";

const Home = () => {
    const { userData } = useAppSelector(state => state.auth);

    return (

        <>
            {userData ? <>
                <TopBooks />
                <TopReadingsBooks />
                <LastBooks />
            </> : <Landing />}
            <News />
            <About />
        </>
    )
}

export default Home
