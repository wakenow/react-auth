import React from 'react';
import { useHistory } from 'react-router-dom';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/Auth.js';
import { Validator, validationForLoginConfig } from '../utils/Validator';

function Login({ handleLogin }) {
  const [data, setData] = React.useState({
    email: '',
    password: ''
  });
  const history = useHistory();
  const [isInfoBoxOpened, setIsInfoBoxOpened] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const validatorRef = React.useRef();

  React.useEffect(() => {
    const form = document.forms.login;
    validatorRef.current = new Validator(validationForLoginConfig, form);
    validatorRef.current.enableValidation();
  }, []);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value
    });
  }

  function handleClose() {
    setIsInfoBoxOpened(false);
    isSuccess && history.push('/sign-in');
  }


  function handleSubmit(evt) {
    evt.preventDefault();
    auth.login(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setData({
            ...data,
            password: ''
          })
          handleLogin(data.email);
          history.push('/');
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoBoxOpened(true)
        console.log(err);
      })

  }
  return (
    <div>
      <form
        name='login'
        onSubmit={handleSubmit}
        className="auth-form"
        noValidate>
        <p className="auth-form__text">Вход</p>
        <input
          name="email"
          className="auth-form__input"
          type="email"
          required
          pattern="^[\w\-\.]+@[\w\-\.]+"
          minLength="3"
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
          pattern="^[\w\-\.#$%&*]+"
          minLength="3"
          maxLength="25"
          autoComplete="off"
          value={data.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <span className="popup__error popup__error_type_password"></span>
        <button
          type="submit"
          className="auth-form__save-button">
          Войти
        </button>
      </form>
      <InfoTooltip isOpen={isInfoBoxOpened} isSuccess={isSuccess} onClose={handleClose} />

    </div>
  );
}
export default Login;