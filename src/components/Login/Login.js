import React, { useEffect, useState } from 'react';
import './Login.css';

import logo from '../../images/logo.svg'

import { Link, useHistory } from 'react-router-dom'

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passworDirty, setPassworDirty] = useState(false);
  const [emailError, setEmailError] = useState('Поле не может быть пустым');
  const [passwordError, setPasswordError] = useState('Поле не может быть пустым');

  const [formValid, setFormValid] = useState(false);

  const [serverError, setServerError] = useState('');

  let history = useHistory();

  useEffect(() => {
    if (emailError || passwordError || !email || !password) {
      setFormValid(false)
    }
    else {
      setFormValid(true)
    }
  }, [emailError, passwordError])

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true)
        break
      case 'password':
        setPassworDirty(true)
        break
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
    e.preventDefault()
    props.handleSubmitLogin(email, password).then((res) => {
      if (res.statusCode !== 400) {
        localStorage.setItem('jwt', res.token);
        window.location.href = '/'
      }
    }).catch((err) => {
        setServerError('Неправильные почта или пароль!')
    })
  }
  
  return (
    <section className="log-section">
      <div className="login">
        <Link to="/"><img src={logo} alt="logo" /></Link>
        <h1 className="login__heading">Рады видеть!</h1>
        <form className="log-form" onSubmit={submitHandler}>
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
          <div className="log-form__submit-wrapper log-form__submit-wrapper_marg">
            {serverError && <p className="log-form__serverror" id="passworderr">{serverError}</p>}
            <button className={`log-form__submit ${formValid && "log-form__submit_active"}`} type="submit">Войти</button>
            <div className="log-form__para-wrapper">
              <p className="log-form__para">Ещё не зарегистрированы?</p>
              <Link to="/signup" className="log-form__link">Зарегистрироваться</Link>
            </div>

          </div>
        </form>
      </div>
    </section>

  );
}

export default Login;
