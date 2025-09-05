import BookCard from "@components/Books/BookCard/BookCard";
import BookCardList from "@components/Books/BookCardList/BookCardList"
import HeadingTitle from "@components/feedback/HeadingTitle/HeadingTitle"
import { useAppDispatch, useAppSelector } from "@hooks/app";
import Error from "@pages/Error/Error";
import Loading from "@pages/Loading/Loading";
import actGetfavorite from "@store/Favorite/act/actGetfavorite";
import actGetUsers from "@store/usersSlice/act/actGetUsers";
import { settingsBox } from "@utils/settingsForSlick"
import { useEffect } from "react";
import { Container } from "react-bootstrap";

const Favorite = () => {
    const dispatch = useAppDispatch();
    const { loading, error } = useAppSelector(state => state.favorite)
    const { favorite, auth, language } = useAppSelector(state => state);
    const booksCardsFavorite = favorite.books.map((book => {
        return <BookCard key={book.id}{...book} />

    }))
    useEffect(() => {
        dispatch(actGetfavorite(auth.userData?.user?.id!));
        dispatch(actGetUsers());
    }, [])
    if (loading === 'pending')
        return <Loading />
    if (error !== null)
        return <Error />
    return (
        <Container>
            <HeadingTitle>{language.language === "English" ? 'My Favorite' : 'مفضلتي'}</HeadingTitle>

            {favorite.books.length ? <BookCardList type='box' settings={settingsBox}>{booksCardsFavorite}</BookCardList>
                : language.language === 'English' ? <div className="text-center mt-4">
                    There is no favorite books
                </div>
                    :
                    <div className="text-center mt-4">
                        لا يوجد كتب في المفضلة
                    </div>}
        </Container>
    )
}

export default Favorite
