import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import React, { useEffect, useState } from 'react';
function Movies(props) {
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


  function setAllMovies(keywords, duration, error) {
    if (error || keywords.length == 0) {
      setError('Нужно ввести ключевое слово')
      setMoviesList([])
      localStorage.removeItem('resultmovies')
    }
    else {
      setLoading(true)
      setError('')
      props.getAllMovies().then((res) => {
        const neededMovies = searchMoviesByKeywords(res, keywords, duration)
        if (neededMovies.length > 0) {
          setMoviesList(neededMovies)
          localStorage.setItem('resultmovies', JSON.stringify(neededMovies))
        }
        else {
          setError('Ничего не найдено')
        }
        
      })
      .catch((err) => {
        setError('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
      })
      .finally(() => {
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    if (localStorage.getItem('resultmovies')) {
      setMoviesList(JSON.parse(localStorage.getItem('resultmovies')))
    }
  }, [])

  return (
    <div className="movies">
      <SearchForm setAllMovies={setAllMovies}/>
      {error && <p className="movies__err">{error}</p>}
      {loading ? <Preloader /> : <MoviesCardList removeAMovie={props.removeAMovie} fromsavedMovies={false} saveAMovie={props.saveAMovie} getMyMovies={props.getMyMovies} moviesList={moviesList}/>}
      
    </div>
  );
}

export default Movies;
