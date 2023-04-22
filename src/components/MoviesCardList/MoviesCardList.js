import React, { useEffect, useState } from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import useWindowDimensions from '../../utils/useWindowDimensions';

function MoviesCardList(props) {
    const { width } = useWindowDimensions();
    const {moviesList, fromsavedMovies} = props
    // console.log(moviesList)
    const [widthType, setWidthType] = useState(0);
    const [tillCount, setTillCount] = useState();
    const [currentList, setCurrentList] = useState((Array.from(moviesList).length > 3 ? Array.from(moviesList).slice(0, 3) : Array.from(moviesList)))

    const [savedMovies, setSavedMovies] = useState([])
    function addTillCount() {
        
        if (widthType == 0) {
            if (tillCount + 3 >= moviesList.length) {
                setTillCount(moviesList.length)
            }
            else {
                setTillCount(tillCount + 3)
            }
        }
        else {
            if (tillCount + 2 >= moviesList.length) {
                setTillCount(moviesList.length)
            }
            else {
                setTillCount(tillCount + 2)
            }
        }
        
    }

    useEffect(() => {
        props.getMyMovies().then((res) => {
            setSavedMovies(res)
        })
    }, [])

    useEffect(() => {
        !fromsavedMovies ? setCurrentList([]) : setCurrentList(moviesList)
    }, [moviesList, fromsavedMovies])

    useEffect(() => {
        if (width > 1279) {
            setWidthType(0)
            setTillCount(12)
        }
        else if (width > 767 && width < 1280) {
            setWidthType(1)
            setTillCount(8)
        }
        else if (width > 320 && width < 768) {
            setTillCount(5)
            setWidthType(2)
        }
        
    }, [width])

    useEffect(() => {
        
        if (!fromsavedMovies) {
            setCurrentList(moviesList.slice(0, tillCount))
        }
        else {
            setCurrentList(moviesList)
        }
        
    }, [tillCount, fromsavedMovies])

    function removeSavedMovieHandler({movieId}) {
        const newCurrentList = currentList.filter((e) => e._id !== movieId)
        
        setCurrentList(newCurrentList)
        return props.removeAMovie({movieId})
    }

    return (
        <div className="allmovies">
            <div className="movies-list">
                {console.log(currentList)}
                {Array.from(currentList).map((card, id) => {
                    const neededCard = savedMovies.filter((e) => {if (e.nameRU == card.nameRU) {return e} })
                    let wasSaved = false;
                    if (neededCard.length > 0) {
                        card.id = neededCard[0]._id
                        wasSaved = true
                    }
                    else {
                        wasSaved = false
                    }
                    return <MoviesCard fromsavedMovies={fromsavedMovies} saveAMovie={props.saveAMovie}  removeAMovie={fromsavedMovies ? removeSavedMovieHandler : props.removeAMovie} key={id}  card={card} wasSaved={wasSaved} />
                })}
                
            </div>
            { !fromsavedMovies && currentList.length > 3 && moviesList.length !== tillCount && <button type="button" className="movies-list__more" onClick={addTillCount}>Еще</button> }
        </div>
        
    );
}

export default MoviesCardList;
