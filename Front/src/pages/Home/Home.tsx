import { Landing, Menu } from "@components/common"
import { useAppSelector } from "@hooks/app";
import About from "@pages/About/About"
import News from "@pages/News/News"

const Home = () => {
    // const { user } = useAppSelector(state => state.auth);

    return (

        <>
            <Landing />
            {/* {user?.username ? <Menu /> : ''} */}
            <News />

            <About />
        </>
    )
}

export default Home
