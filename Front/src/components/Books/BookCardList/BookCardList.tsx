
// slick 
import Slider from "react-slick";

// slick css 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
type TBookList = {
    type: string,
    settings: Object,
    children: React.ReactNode
}


const BookCardList = ({ type, settings, children }: TBookList) => {
    return (

        <div className={type}>
            <Slider {...settings} >

                {children}

            </Slider>

        </div>

    )
}

export default BookCardList
