import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import validateEmail from '../util/validateEmail';
import { fetchPost } from '../services/connectApi';
import '../css/Login.css';

export default function Login() {
  const history = useHistory();
  const [loginEmail, setloginEmail] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const [msgError, setmsgError] = useState();
  const [isDisabled, setisDisabled] = useState(true);
  const data = { email: loginEmail, password: loginPassword };
  const url = 'http://localhost:3001/login';
  const SIX = 6;
  const STATUSOK = 200;
  const NOTFOUND = 404;
  const UNAUTHORIZED = 401;

  const handleInputEmail = ({ target }) => {
    setloginEmail(target.value);
  };

  const handleInputPassword = ({ target }) => {
    setloginPassword(target.value);
  };

  const clickbutton = async (event) => {
    event.preventDefault();

    const result = await fetchPost(url, data);
    const dataLocal = {
      id: result.data.id,
      name: result.data.name,
      email: result.data.email,
      role: result.data.role,
      token: result.data.token,
    };

    if (result.status === STATUSOK) {
      localStorage.setItem('data', JSON.stringify(dataLocal));
      history.push('/customer/products');
    } else if (result.status === UNAUTHORIZED) {
      setmsgError('Senha incorreta');
    } else if (result.status === NOTFOUND) {
      setmsgError('Usuário não cadastrado');
    }
  };

  const adNewUser = () => {
    history.push('/register');
  };

  useEffect(() => {
    const validate = validateEmail(loginEmail);
    const psw = loginPassword.length >= SIX;
    if (validate && psw) {
      setisDisabled(false);
    }
  }, [loginEmail, loginPassword, msgError]);

  return (
    <div className="loginContainer">
      <form className="loginBox">
        <div className="loginInputContainer">
          <label htmlFor="loginEmail" className="">
            Login
            <input
              id="loginEmail"
              type="email"
              className="loginInput"
              data-testid="common_login__input-email"
              placeholder="email@tryber.com.br"
              name="loginEmail"
              value={ loginEmail }
              onChange={ handleInputEmail }
            />
          </label>
        </div>
        <div className="loginInputContainer">
          <label htmlFor="loginPassword">
            Senha
            <input
              id="loginPassword"
              type="password"
              className="loginInput"
              data-testid="common_login__input-password"
              placeholder="********"
              name="loginPassword"
              value={ loginPassword }
              onChange={ handleInputPassword }
              minLength="6"
            />
          </label>
        </div>
        <button
          type="submit"
          className="loginButton"
          data-testid="common_login__button-login"
          onClick={ clickbutton }
          disabled={ isDisabled }
        >
          LOGIN
        </button>
        <button
          type="button"
          className="loginButAdd"
          data-testid="common_login__button-register"
          onClick={ adNewUser }
        >
          Ainda não tenho cadastro
        </button>
        {
          msgError ? (
            <p data-testid="common_login__element-invalid-email">
              { msgError }
            </p>) : null
        }
      </form>
    </div>
  );
}
