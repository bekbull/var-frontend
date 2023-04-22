import './Profile.css';
import '../Login/Login.css';
import React, { useEffect, useState } from 'react';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useHistory } from 'react-router';

function Profile(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const history = useHistory();

    const [editing, setEditing] = useState(false);
    const [profileButtonText, setProfileButtonText] = useState('Редактировать');
    const [profileButtonTextRed, setProfileButtonTextRed] = useState('Выйти из аккаунта');

    const [name, setName] = useState(currentUser.name);
    const [email, setEmail] = useState(currentUser.email);
    const [nameDirty, setNameDirty] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');

    const [serverError, setServerError] = useState('');

    const [formValid, setFormValid] = useState(true);

    useEffect(() => {
        console.log(nameError.length > 0, emailError.length > 0, name.length == 0, email.length == 0)
        console.log(formValid);
        if (nameError.length > 0 || emailError.length > 0 || name.length == 0 || email.length == 0) {
            setFormValid(false)
        }
        else {
            setFormValid(true)
        }
    }, [nameError, emailError])

    const blurHandler = (e) => {
        console.log(e.target.value);
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
        }
    }

    const nameHandler = e => {
        setNameDirty(true)
        setName(e.target.value)
        const nameRe = /^[a-zA-Z\-а-яёЁА-Я\s]+$/
        console.log(nameRe.test(String(e.target.value)));
        if (currentUser.name === e.target.value) {
            setNameError('Имя не изменился')
        }
        else if (e.target.value === '') {
            setNameError('Поле не может быть пустым')
        }
        else if (e.target.value.length < 2) {
            setNameError('Минимальная длина 2')
        }
        else if (!nameRe.test(String(e.target.value))) {
            setNameError('Поле name содержит только латиницу, кириллицу, пробел или дефис')
        }
        else {
            setNameError('')
        }
    }

    const emailHandler = (e) => {
        setEmailDirty(true)
        setEmail(e.target.value)
        const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (currentUser.email === e.target.value) {
            setNameError('Email не изменился')
        }
        else if (e.target.value === '') {
            setEmailError('Поле не может быть пустым')
        }
        else if (!emailRe.test(String(e.target.value))) {
            setEmailError('Не валидное поле')
        }
        else {
            setEmailError('')
        }
    }

    function editHandler(e) {
        console.log('editing');

        setEditing(true)
        setNameError(' ')
        setEmailError(' ')
        setProfileButtonText('Сохранить')
        setProfileButtonTextRed('Отмена')

        if (e.target.classList.contains('profile__button_red')) {
            setEditing(false)
            setNameError('')
            setEmailError('')
            setFormValid(true)
            setProfileButtonText('Редактировать')
            setProfileButtonTextRed('Выйти из аккаунта')
        }
        else {
            if (formValid && (email !== currentUser.email || name !== currentUser.name)) {
                setEmailError('')
                setNameError('')
                props.handleSubmitEditCredentials(name, email).then((res) => {
                    if (res.statusCode !== 400) {
                        setServerError('')
                        setEditing(false)
                        setNameError('')
                        setEmailError('')
                        currentUser.name = name;
                        currentUser.email = email;
                        setProfileButtonText('Редактировать')
                        setProfileButtonTextRed('Выйти из аккаунта')
                    }
                }).catch((err) => {
                    console.log(err);
                    setServerError('Что-то пошло не так!')
                })
            }
        }
        return
    }

    function logoutHandler() {
        props.logout()
    }

    return (
        <div className="profile">
            <div className="profile__info-wrapper">
                <h1 className="profile__heading">Привет, {currentUser.name}</h1>
                {editing
                    ?
                    <div className="login">
                        <form className="log-form" noValidate>
                            <div className="log-form__wrapper">
                                <label htmlFor="name" className="log-form__label">Имя</label>
                                <input onBlur={e => blurHandler(e)} type="text" name="name" id="name" value={name} className="log-form__input" onChange={nameHandler} required maxLength="30" minLength="2" />
                                {nameDirty && nameError && <p className="log-form__error">{nameError}</p>}
                            </div>
                            <div className="log-form__wrapper">
                                <label htmlFor="email" className="log-form__label">E-mail</label>
                                <input onBlur={e => blurHandler(e)} type="email" name="email" id="email" value={email} className="log-form__input" onChange={emailHandler} />
                                {emailDirty && emailError && <p className="log-form__error">{emailError}</p>}
                            </div>
                        </form>
                    </div>
                    :
                    <ul className="profile__list">
                        <li className="profile__elem">
                            <p className="profile__data">Имя</p>
                            <p className="profile__data">{currentUser.name}</p>
                        </li>
                        <li className="profile__elem">
                            <p className="profile__data">Почта</p>
                            <p className="profile__data">{currentUser.email}</p>
                        </li>
                    </ul>
                }
            </div>
            {/* form start */}

            {/* form end */}
            {serverError && <p className="log-form__serverror" id="passworderr">{serverError}</p>}
            <div className="profile__buttons">
                <button onClick={editHandler} disabled={formValid ? false : true} className={`profile__button ${formValid ? '' : 'profile__button_inactive'}`}>{profileButtonText}</button>
                <button onClick={editing ? editHandler : logoutHandler} className="profile__button profile__button_red">{profileButtonTextRed}</button>
            </div>
        </div>
    );
}

export default Profile;
