import '../Login/Login.css';

import logo from '../../images/logo.svg'
import React from 'react';

import { Link, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react';

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passworDirty, setPassworDirty] = useState(false);
  const [nameError, setNameError] = useState('Поле не может быть пустым');
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [passwordError, setPasswordError] = useState('Поле не может быть пустым');

  const [serverError, setServerError] = useState('');

  const [formValid, setFormValid] = useState(false);

  let history = useHistory()

  useEffect(() => {
    if (nameError || emailError || passwordError || !name || !email || !password) {
      setFormValid(false)
    }
    else {
      setFormValid(true)
    }
  }, [nameError, emailError, passwordError])

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'name':
        setNameDirty(true)
        break
      case 'password':
        setPassworDirty(true)
        break
    }
  }

  const nameHandler = e => {
    setNameDirty(true)
    setName(e.target.value)
    const nameRe = /^[a-zA-Z\-а-яёЁА-Я\s]+$/
    if (e.target.value === '') {
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
    if (e.target.value === '') {
      setEmailError('Поле не может быть пустым')
    }
    else if (!emailRe.test(String(e.target.value))) {
      setEmailError('Не валидное поле')
    }
    else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassworDirty(true)
    setPassword(e.target.value)
    if (e.target.value === '') {
      setPasswordError('Поле не может быть пустым')
    }
    else if (e.target.value.length < 8) {
      setPasswordError('Не менее 8 символов')
    }
    else {
      setPasswordError('')
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    props.handleSubmitRegister(name, email, password).then((res) => {
      if (res.statusCode !== 400) {
        setServerError('')
        
        props.handleSubmitLogin(email, password).then((rese) => {
          console.log('sdasd');
          if (rese.statusCode !== 400) {
            
            localStorage.setItem('jwt', rese.token);
            history.push('/movies')
          }
        })

        console.log('You are successfully registered, and being redirected to Login page.')
      }
    }).catch((err) => {
      if (err.status == 409) {
        setServerError('Пользователь с таким email уже существует!')
      }
    })
  }

  return (
    <section className="log-section">
      <div className="login">
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <h1 className="login__heading">Добро пожаловать!</h1>
        <form className="log-form" noValidate onSubmit={submitHandler}>
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
          <div className="log-form__wrapper">
            <label htmlFor="password" className="log-form__label">Пароль</label>
            <input onBlur={e => blurHandler(e)} type="password" name="password" id="password" value={password} className="log-form__input" onChange={passwordHandler} />
            {passworDirty && passwordError && <p className="log-form__error" id="passworderr">{passwordError}</p>}

          </div>
          <div className="log-form__submit-wrapper">
            {serverError && <p className="log-form__serverror" id="passworderr">{serverError}</p>}
            <button disabled={!formValid} className={`log-form__submit ${formValid && "log-form__submit_active"}`} type="submit">Зарегистрироваться</button>
            <div className="log-form__para-wrapper">
              <p className="log-form__para">Уже зарегистрированы?</p>
              <Link to="/signin" className="log-form__link">Войти</Link>
            </div>

          </div>
        </form>
      </div>
    </section>

  );
}

export default Register;
