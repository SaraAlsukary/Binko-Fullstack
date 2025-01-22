import { useAppSelector } from '@hooks/app';
import SearchIcon from '@assets/svgs/search.svg?react';
import style from './Search.module.css';
import './SearchAddition.css';
import Input from '../Input/Input';
import { useNavigate } from 'react-router-dom';
const { searchIcon, search } = style;
type TClass = {
    isThereNavigate?: boolean
    className?: string,
    checkLocate?: boolean,
    onChange?: (e: any) => void
}
const Search = ({ className, isThereNavigate, checkLocate, onChange }: TClass) => {
    const { language } = useAppSelector(state => state.language);
    const navigate = useNavigate();

    return (
        <div style={checkLocate ? { display: 'none' } : {}} className={`${search} ${className}`} >
            <Input type='search'
                onChange={onChange}
                onFocus={() => { isThereNavigate ? navigate('booksSearch') : '' }}
                placeholder={language === 'Arabic' ? 'ابحث' : 'search here..'} />
            <div className={searchIcon}>
                <SearchIcon style={language === 'Arabic' ? { width: '100%', height: '100%', position: 'absolute', right: '0' } : {
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    left: "0"
                }} />
            </div>
        </div>
    )
}

export default Search
