import Lottie from "lottie-react";
import girl from '@assets/lottieFiles/girlWithBook.json'
import flyingBook from '@assets/lottieFiles/FlyingBook.json'
import Loading from '@assets/lottieFiles/Loading.json'
import Advanture from '@assets/lottieFiles/Advanture.json'
import Action from '@assets/lottieFiles/Action.json'
import Fiction from '@assets/lottieFiles/Fiction.json'
import Classic from '@assets/lottieFiles/Classic.json'
import Fantasy from '@assets/lottieFiles/Fantasy.json'
import Horror from '@assets/lottieFiles/Horror.json'
import Poem from '@assets/lottieFiles/Poem.json'
import Science from '@assets/lottieFiles/Science.json'
import ScienceFiction from '@assets/lottieFiles/ScienceFiction.json'
import Romance from '@assets/lottieFiles/Romance.json'
import BooksAbout from '@assets/lottieFiles/Books About.json'
import React from "react";

const lottieFilesMap = {
    girl,
    flyingBook,
    Loading,
    Advanture,
    Action,
    Fiction,
    Science,
    ScienceFiction,
    Poem,
    Classic,
    Fantasy,
    Romance,
    Horror,
    BooksAbout

};

type LottieHandlerProps = {
    type: keyof typeof lottieFilesMap;
    message?: string;
    className?: string;
    loop?: boolean;
    style?: React.CSSProperties
};

const LottieHandler = ({ type, message, className, loop, style }: LottieHandlerProps) => {
    const lottie = lottieFilesMap[type];
    // const messageStyle =
    //     type === "error"
    //         ? { fontSize: "19px", color: "red" }
    //         : { fontSize: "19px", marginTop: "30px" };

    return (
        <div className={` ${className}`}>
            <Lottie animationData={lottie} style={style} loop={loop} />
            {message && <h3 style={{ margin: '120px auto', textAlign: 'center', color: 'var(--main-color)' }}
            // style={messageStyle}
            >{message}</h3>}
        </div>
    );
};

export default LottieHandler;
