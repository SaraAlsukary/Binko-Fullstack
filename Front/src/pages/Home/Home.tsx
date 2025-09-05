import { Landing } from "@components/common"
import TopBooks from '@components/Books/TopBooks/Books'
import { useAppSelector } from "@hooks/app";
import About from "@pages/About/About"
import News from "@pages/News/News"
import TopReadingsBooks from "@components/Books/TopReadingsBooks/TopReadingsBooks";
import LastBooks from "@components/Books/LastBooks/LastBooks";
import Recommendations from "@components/Books/Recommendations/Recommendations";
import ForeignBooks from "@components/Books/ForeignBooks/ForeignBooks";
import ArabicBooks from "@components/Books/ArabicBooks/ArabicBooks";
import RatingShowStars from "@components/common/RatingShowStars/RatingShowStars";

const Home = () => {
    const { userData } = useAppSelector(state => state.auth);
    const { language } = useAppSelector(state => state.language);

    return (

        <>
            {userData ? <>
                {language === "English" ? <ForeignBooks /> : <ArabicBooks />}
                <Recommendations />
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
