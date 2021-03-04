import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth.js';
import { Validator, validationForLoginConfig } from '../utils/Validator';

function Register() {
    const history = useHistory({});

  const [data, setData] = React.useState({
    email: '',
    password: ''
  });

  const [isInfoBoxOpened, setIsInfoBoxOpened] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const validatorRef = React.useRef();

  React.useEffect(() => {
    const form = document.forms.login;
    validatorRef.current = new Validator(validationForLoginConfig, form);
    validatorRef.current.enableValidation();
  }, []);

  function handleClose() {
    setIsInfoBoxOpened(false);
    isSuccess && history.push('/sign-in');
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    auth.register(data)
      .then((res) => {
        setIsSuccess(true);
        setIsInfoBoxOpened(true);
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoBoxOpened(true)
      })
  }
  return (
    <div>
        <Link to="/sign-in" className="header__link">Войти</Link>
      <form
        name='login'
        onSubmit={handleSubmit}
        className="auth-form"
        noValidate>
        <p className="auth-form__text">Регистрация</p>
        <input
          name="email"
          className="auth-form__input"
          type="email"
          required
          minLength="2"
          maxLength="40"
          autoComplete="off"
          value={data.name}
          onChange={handleChange}
          placeholder="Email"
        />
        <span className="popup__error popup__error_type_email"></span>
        <input
          name="password"
          className="auth-form__input"
          type="password"
          required
          minLength="2"
          maxLength="200"
          autoComplete="off"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <span className="popup__error popup__error_type_password"></span>
        <button
          type="submit"
          className="auth-form__save-button">
          Зарегистрироваться
          </button>
          <Link to="/sign-in" className="auth-form__link">Уже зарегистрированы? Войти.</Link>
      </form>
      <InfoTooltip isOpen={isInfoBoxOpened} isSuccess={isSuccess} onClose={handleClose} />


    </div>
  );
}


export default Register;