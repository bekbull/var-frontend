import { Link, NavLink } from 'react-router-dom';
import React from 'react';

import './Navigation.css';
import accountIcon from '../../images/account-icon.svg';
import navIcon from '../../images/nav-icon.svg';
import navCloseIcon from '../../images/nav-close-icon.svg';

function Navigation(props) {
    return (
        <>
            <nav className={`nav ${props.loggedIn && props.navOpened ? 'nav_opened' : ''}`}>
                {
                    !props.loggedIn ?
                        <ul className='nav__elements'>
                            <li>
                                <Link to='signup' className='nav__register'>Регистрация</Link>
                            </li>
                            <li>
                                <Link to='signin' className='nav__login'>Войти</Link>
                            </li>
                        </ul>
                        :
                        <ul className={`nav__elements ${props.loggedIn && props.navOpened ? 'nav__elements_opened' : ''}`}>
                            <li className={`nav__element nav__element_none ${props.loggedIn && props.navOpened ? 'nav__element_opened' : ''}`}>
                                <NavLink exact to='/' activeClassName='nav__link_active' className='nav__link'>Главная</NavLink>
                            </li>
                            <li className={`nav__element ${props.loggedIn && props.navOpened ? 'nav__element_opened' : ''}`}>
                                <NavLink to='/movies' activeClassName='nav__link_active' className='nav__link'>Фильмы</NavLink>
                            </li>
                            <li className={`nav__element ${props.loggedIn && props.navOpened ? 'nav__element_opened' : ''}`}>
                                <NavLink to='/saved-movies' activeClassName='nav__link_active' className='nav__link'>Сохранённые фильмы</NavLink>
                            </li>
                            <li className={`nav__element ${props.loggedIn && props.navOpened ? 'nav__element_opened' : ''}`}>
                                <NavLink to='/profile'
                                    activeClassName='nav__link_active'
                                    className='nav__link'><p>Аккаунт</p> <img src={accountIcon} alt="" className="nav__icon" />
                                </NavLink>
                            </li>
                        </ul>
                }
            </nav>
            <img src={navIcon} onClick={props.navHandler} className={`nav__nav-icon ${props.loggedIn && !props.navOpened ? '' : 'nav__nav-icon_inactive'}`} alt="nav" />
            <img src={navCloseIcon} onClick={props.navHandler} className={`nav__nav-close ${props.navOpened ? 'nav__nav-close_active' : ''}`} alt="nav close" />
        </>
    )
}

export default Navigation;