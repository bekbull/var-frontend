import './App.css';

import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import Main from '../Main/Main'
import React, { useState } from 'react';
import Profile from '../Profile/Profile'
import Movies from '../Movies/Movies'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { Switch, Route, Redirect, useHistory } from 'react-router';
import SavedMovies from '../SavedMovies/SavedMovies';
import { register, authorize, editCredentials, getSavedMovies, postAMovie, checkToken, removeMovie } from '../../utils/MainApi'
import { getMovies } from '../../utils/MoviesApi'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [navOpened, setNavOpened] = React.useState(false)
  const [currentUser, setCurrentUser] = React.useState({ loggedIn: false })
  const [loaded, setLoaded] = useState(false)

  let history = useHistory();

  React.useEffect(() => {

    if (localStorage.getItem('jwt')) {
      checkToken(localStorage.getItem('jwt')).then((data) => {
        data.loggedIn = true
        setCurrentUser(data);
        setLoaded(true)
      })
        .catch(err => console.log(err))
    }
    else {
      setCurrentUser({ loggedIn: false })
      setLoaded(true)
    }


  }, [])

  function navHandler() {
    setNavOpened(!navOpened);
  }

  function handleSubmitRegister(name, email, password) {
    return register(name, email, password)
  }

  function handleSubmitLogin(email, password) {
    const ap = authorize(email, password)
    ap.then((res) => {
      checkToken(res.token).then((data) => {
        data.loggedIn = true
        setCurrentUser(data);
      })
        .catch(err => console.log(err))
    })
    return ap
  }

  function handleSubmitEditCredentials(name, email) {
    return editCredentials(name, email)
  }

  function getAllMovies() {
    return getMovies()
  }

  function getUserSavedMovies() {
    return getSavedMovies()
  }

  function saveAMovie({ country, director, duration, year,
    description, image, trailerLink, nameRU, nameEN, id }) {
    return postAMovie(country, director, duration, year,
      description, `https://api.nomoreparties.co${image.url}`, trailerLink, nameRU, nameEN, `https://api.nomoreparties.co${image.formats.thumbnail.url}`, id)
  }

  function removeAMovie({movieId}) {
    return removeMovie(movieId)
  }

  function getMyMoviesHandler() {
    return getSavedMovies()
  }

  function logout() {
    localStorage.removeItem('jwt')
    localStorage.removeItem('resultmovies')
    setCurrentUser({loggedIn: false})
    history.push('/signin')
  }

  return (
    <div className="app">
      {loaded &&
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route path="/" exact>
              <Header navOpened={navOpened} navHandler={navHandler} />
              <Main />
              <Footer />
            </Route>

            <Route path="/movies">
              <Header navOpened={navOpened} navHandler={navHandler} />
              <ProtectedRoute exact path="/movies" loggedIn={currentUser.loggedIn} getAllMovies={getAllMovies} getUserSavedMovies={getUserSavedMovies} removeAMovie={removeAMovie} saveAMovie={saveAMovie} getMyMovies={getMyMoviesHandler} component={Movies} />
              <Footer />
            </Route>
            <Route path="/saved-movies">
              <Header navOpened={navOpened} navHandler={navHandler} />
              <ProtectedRoute exact path="/saved-movies" loggedIn={currentUser.loggedIn} getUserSavedMovies={getUserSavedMovies} removeAMovie={removeAMovie} getMyMovies={getMyMoviesHandler} component={SavedMovies} />
              <Footer />
            </Route>
            <Route path="/profile" exact>
              <Header navOpened={navOpened} navHandler={navHandler} />
              <ProtectedRoute exact path="/profile" logout={logout} loggedIn={currentUser.loggedIn} handleSubmitEditCredentials={handleSubmitEditCredentials} component={Profile} />
              <Footer />
            </Route>
            <Route path="/signin">
              {!currentUser.loggedIn ? <Login handleSubmitLogin={handleSubmitLogin} /> : <Redirect to="/" />}
            </Route>
            <Route path="/signup">
              {!currentUser.loggedIn ? <Register handleSubmitRegister={handleSubmitRegister} handleSubmitLogin={handleSubmitLogin} /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </CurrentUserContext.Provider>}

    </div >
  );
}

export default App;
