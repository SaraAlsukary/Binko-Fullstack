import BookCard from "@components/Books/BookCard/BookCard";
import BookCardList from "@components/Books/BookCardList/BookCardList"
import HeadingTitle from "@components/feedback/HeadingTitle/HeadingTitle"
import { useAppDispatch, useAppSelector } from "@hooks/app";
import actGetfavorite from "@store/Favorite/act/actGetfavorite";
import actGetUsers from "@store/usersSlice/act/actGetUsers";
import { settingsBox } from "@utils/settingsForSlick"
import { useEffect } from "react";
import { Container } from "react-bootstrap";

const Favorite = () => {
    const dispatch = useAppDispatch();
    const { favorite, auth, users, language } = useAppSelector(state => state);

    const booksCardsFavorite = favorite.books.map((book => {
        const userName = users.users.find(user => user.id == book.user)?.name;
        return <BookCard name={book.name} category={book.category} image={book.image} user={userName} id={book.id} description={book.description} />

    }))
    useEffect(() => {
        dispatch(actGetfavorite(auth.user?.id));
        dispatch(actGetUsers());
    }, [])
    return (
        <Container>
            <HeadingTitle>{language.language === "English" ? 'My Favorite' : 'مفضلتي'}</HeadingTitle>
            <BookCardList type='box' settings={settingsBox}>{booksCardsFavorite}</BookCardList>

        </Container>
    )
}

export default Favorite
