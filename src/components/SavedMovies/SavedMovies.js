import React, { useEffect, useState } from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {

  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function searchMoviesByKeywords(movies, keywords, duration) {
    return Array.from(movies).filter((movie) => (
      Array.from(keywords).some((keyword) => (
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) && (duration ? movie.duration <= 40 : true) 
      ))
    ))
  }

  useEffect(() => {
    props.getMyMovies().then((res) => {
      setMoviesList(res)
    })
  }, [])

  function setAllMovies(keywords, duration, error) {
    console.log(keywords.length);
    if (keywords.length == 0) {
      props.getMyMovies().then((res) => {
        setError('')
        setMoviesList(res)
      })
    }
    else {
      const neededMovies = searchMoviesByKeywords(moviesList, keywords, duration)
      if (neededMovies.length > 0) {
        setMoviesList(neededMovies)
      }
      else {
        setError('Ничего не найдено')
      }
    }
  }

  return (
    <div className="movies">
      <SearchForm setAllMovies={setAllMovies}/>
      {error ? <p className="movies__err">{error}</p> : <MoviesCardList moviesList={moviesList} removeAMovie={props.removeAMovie} fromsavedMovies={true} getMyMovies={props.getMyMovies}/>}
      
    </div>
  );
}

export default SavedMovies;
