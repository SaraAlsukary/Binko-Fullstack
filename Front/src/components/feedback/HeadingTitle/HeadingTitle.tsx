import style from './HeadingTitle.module.css';
import { ReactNode } from 'react';
const { headingContainer } = style;
const HeadingTitle = ({ children }: { children: ReactNode }) => {
    return (
        <div className={headingContainer}>
            <h2>{children}</h2>
        </div>
    )
}

export default HeadingTitle
