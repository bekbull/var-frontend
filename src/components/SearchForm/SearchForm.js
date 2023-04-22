import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import React, { useRef, useState } from 'react';

function SearchForm(props) {

    const movienamekeyword = useRef();

    const [duration, setDuration] = useState(false)

    function getMovies(e) {
        e.preventDefault();
        const keywords = movienamekeyword.current.value ? movienamekeyword.current.value.split(' ') : []
        if (keywords.length == 0) {
            props.setAllMovies([], false, "")    
        }
        else {
            props.setAllMovies(keywords, duration)
        }
    }

    return (
        <form className="searchform" onSubmit={getMovies}>
            <div className="searchform__input-wrapper">
                <img src={searchIcon} alt="search" className="searchform__search-icon" />
                <input type="text" placeholder="Фильм" className="searchform__input" ref={movienamekeyword} />
                <button type="submit" className="searchform__button">Найти</button>
            </div>

            <div className="searchform__switch">
                <input type="checkbox" id="check" />
                <label htmlFor="check"
                onClick={() => setDuration(!duration)}>
                    <span></span>
                    <div><i></i></div>
                </label>
                <p className="searchform__shorts">Короткометражки</p>
            </div>
        </form>
    );
}

export default SearchForm;
