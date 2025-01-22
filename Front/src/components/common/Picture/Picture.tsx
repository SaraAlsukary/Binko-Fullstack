import styles from './Picture.module.css'
const { pic, img } = styles;
type TPicture = {
    imageHandler?: (e: any) => void,
    file: string
}
const Picture = ({ imageHandler, file }: TPicture) => {
    return (
        <div className={pic}>
            <input id="img" type="file" onChange={imageHandler} />
            <label htmlFor="img">
                <div className={img}>
                    <img src={file} />
                    <label htmlFor="img">
                        <span>+</span>
                    </label>
                </div>
            </label>
        </div>
    )
}

export default Picture
