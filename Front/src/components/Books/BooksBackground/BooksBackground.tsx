import styles from './BooksBackground.module.css';
const { booCard } = styles
type TImage = {
    img: string
}
const BooksBackground = ({ img }: TImage) => {
    return (
        <div className={booCard} >

            <img src={img} alt="" />

        </div>
    )
}

export default BooksBackground
