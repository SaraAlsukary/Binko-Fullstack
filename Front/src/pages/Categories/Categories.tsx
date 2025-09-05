import { Row, Col, Container } from "react-bootstrap";
import Style from './Categories.module.css';
import { useAppDispatch, useAppSelector } from "@hooks/app";
import { useEffect } from "react";
import actGetCategories from "@store/categorySlice/act/actGetCategories";
import './CategoriesColor.css';
import { useNavigate } from "react-router-dom";
import Loading from "@pages/Loading/Loading";
import Error from "@pages/Error/Error";
import { Localhost } from "@utils/localhost";
const { cardCate, containerCate, colss} = Style;
const Categories = () => {
    const language = useAppSelector(state => state.language.language);
    const { categories, loading, error } = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actGetCategories())
    }, [])
    if (loading === 'pending')
        return <Loading />
    if (error !== null)
        return <Error />
    const categoryCard = categories.map((cate) =>
        <Col onClick={() => navigate(`books/${cate.id}`)} key={cate.id} className={colss}>
            <div className={`${cardCate} ${cate.name}`}>
                <h3>{language === 'Arabic' ? cate.name_arabic : cate.name}</h3>
                <img src={`${Localhost}${cate.file}`} alt="" />
            </div>
        </Col>
    )
    return (
        <Container className={containerCate}>
            <Row>
                {categoryCard}
            </Row>
        </Container>
    )
}

export default Categories
