import { Row, Col, Container } from "react-bootstrap";
import Style from './Categories.module.css';
import { useAppDispatch, useAppSelector } from "@hooks/app";
import LottieHandler from "@components/feedback/lottieHandler/lottieHandler";
import { useEffect } from "react";
import actGetCategories from "@store/categorySlice/act/actGetCategories";
import './CategoriesColor.css';
import { useNavigate } from "react-router-dom";
const { cardCate, containerCate, colss, advanture, action, romance, fiction, science, scienceFiction, fantasy, classic, horror, poem } = Style;
const Categories = () => {
    const language = useAppSelector(state => state.language.language);
    const { categories } = useAppSelector(state => state.categories);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(actGetCategories())
    }, [])
    const categoryCard = categories.map((cate) =>
        <Col onClick={() => navigate(`books/${cate.id}`)} key={cate.id} className={colss}>
            <div className={`${cardCate} ${cate.name}`}>
                <h3>{language === 'Arabic' ? cate.name : cate.name}</h3>
                <video width='100' height='100' autoPlay loop>
                    <source src={`http://127.0.0.1:8000${cate.file}`} type="video/webm" />
                </video>
            </div>
        </Col>
    )
    return (
        <Container className={containerCate}>
            <Row>
                {categoryCard}

                {/* <Col className={colss}>
                    <div className={`${cardCate} ${advanture}`}>
                        <h3>{language === 'Arabic' ? 'مغامرة' : 'Advanture'}</h3>
                        <LottieHandler type="Advanture" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>                   <Col className={colss}>

                    <div className={`${cardCate} Action`}>
                        <h3>{language === 'Arabic' ? 'أكشن' : 'Action'}</h3>
                        <LottieHandler type="Action" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>                  <Col className={colss}>

                    <div className={`${cardCate} ${fiction}`}>
                        <h3>{language === 'Arabic' ? 'خيال' : 'Fiction'}</h3>
                        <LottieHandler type="Fiction" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>                  <Col className={colss}>

                    <div className={`${cardCate} ${science}`}>
                        <h3>{language === 'Arabic' ? 'علم' : 'Science'}</h3>
                        <LottieHandler type="Science" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>                   <Col className={colss}>

                    <div className={`${cardCate} ${scienceFiction}`}>
                        <h3>{language === 'Arabic' ? 'خيال علمي' : 'Science Fiction'}</h3>
                        <LottieHandler type="ScienceFiction" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>                  <Col className={colss}>

                    <div className={`${cardCate} ${poem}`}>
                        <h3>{language === 'Arabic' ? 'شعر' : 'Poem'}</h3>
                        <LottieHandler type="Poem" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>
                <Col className={colss}>

                    <div className={`${cardCate} ${classic}`}>
                        <h3>{language === 'Arabic' ? 'كلاسيكي' : 'Classic'}</h3>
                        <LottieHandler type="Classic" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>
                <Col className={colss}>

                    <div className={`${cardCate} ${fantasy}`}>
                        <h3>{language === 'Arabic' ? 'فنتازيا' : 'Fantasy'}</h3>
                        <LottieHandler type="Fantasy" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>
                <Col className={colss}>

                    <div className={`${cardCate} ${romance}`}>
                        <h3>{language === 'Arabic' ? 'عاطفي' : 'Romance'}</h3>
                        <LottieHandler type="Romance" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col>
                <Col className={colss}>

                    <div className={`${cardCate} ${horror}`}>
                        <h3>{language === 'Arabic' ? 'رعب' : 'Horror'}</h3>
                        <LottieHandler type="Horror" loop={true} style={{ width: '100px', height: '100px' }} />
                    </div>

                </Col> */}


            </Row>
        </Container>
    )
}

export default Categories
