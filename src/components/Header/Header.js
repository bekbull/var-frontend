import logo from '../../images/logo.svg'
import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function Header(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <header className="header">
            <Link to="/"><img src={logo} alt="logo" /></Link>
            <Navigation loggedIn={currentUser.loggedIn} navOpened={props.navOpened} navHandler={props.navHandler} />
        </header>
    )
}


export default Header;