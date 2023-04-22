import { useEffect, useState } from 'react';
import './MoviesCard.css';
import React from 'react';
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
function MoviesCard(props) {
    const { card, wasSaved } = props;
    const location = useLocation().pathname;
    const [cardState, setCardState] = useState();
    const movieduration = card.duration > 60 ? `${Math.floor(card.duration / 60)}ч ${card.duration % 60}м` : `${card.duration}м`

    useEffect(() => {
        if (location === '/movies' && !props.wasSaved){
            setCardState('notsaved')
        }
        else if (location === '/movies' && props.wasSaved) {
            setCardState('saved')
        }
        else {
            setCardState('remove')
        }
    }, [wasSaved])

    function handlerChangeSaveState() {
        console.log(card);
        if (location === '/movies' && cardState === 'notsaved') {
            props.saveAMovie(card).then(res => {
                if (res.statusCode !== 400) {
                    setCardState('saved')
                  }
            }).catch(err => {
                console.log(err);
            })
        }
        else if (location === '/movies' && cardState === 'saved') {
            props.removeAMovie({movieId: card.id}).then(res => {
                if (res.statusCode !== 400) {
                    setCardState('notsaved')
                  }
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            props.removeAMovie({movieId: card.id}).then(res => {
                if (res.statusCode !== 400) {
                    setCardState('remove')
                  }
            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
        <div className="movies-card">
            <div className="movies-card__info-wrapper">
                <div className="movies-card__text-wrapper">
                    <h2 className="movies-card__name">{card.nameRU}</h2>
                    <p className="movies-card__time">{movieduration}</p>
                </div>
                <button type="button" onClick={handlerChangeSaveState} className={`movies-card__savestate movies-card__savestate_${cardState}`}></button>
            </div>
            <a href={card.trailerLink} target="_blank" >
                <img src={location === '/movies' ? `https://api.nomoreparties.co${card.image?.url}` : card.image} className="movies-card__preview" alt="moviePreview" />
            </a>
        </div>
    );
}

export default MoviesCard;
