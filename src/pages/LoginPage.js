import React, { useState } from 'react'
import { connect } from 'react-redux';
import { loginUser } from '../actions/auth.actions';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import './scss/Login/Login.css';

const LoginPage = ({ loginUser, error }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errorPassword, setErrorPassword] = useState('')

  const { email, password } = userData;

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });


  const login = (e) => {
    e.preventDefault();
    let flag = true;
    setErrorPassword('')


    if (email.length < 2 || password.length < 2) {
      flag = false;
      setErrorPassword('Za krótka nazwa')
      return;
    }
    if (password.indexOf("-") > 0 || password.indexOf("=") > 0) {
      flag = false;
      setErrorPassword('Niezgodne znaki')
      return;
    }
    if (flag) {
      loginUser(userData)
    }

  }


  return (
    <main className="register-page-wrapper">
      <form className="register-section" onSubmit={(e) => login(e)}>
        <div className="inputs-wrapper">
          <header className="register-header-wrapper">
           
                <p className="register-header"><i className="fas fa-users"></i> Zaloguj się</p>  
            </header>

          <div className="label-wrapper-log">
            <label className="label__register">E-mail:</label>
          </div>
          <input
            name="email"
            value={email}
            type="email"
            onChange={(e) => onChange(e)}
          />
          <br />
          <div className="label-wrapper-log">
            <label className="label__register">Hasło:</label>
          </div>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <br/>
          <div className="label-wrapper-log">
            <label className="label__register"></label>
          </div>
          <span
            className="button-wrapper app_color_background"
            onClick={(e) => login(e)}
          >
            <button type="submit" className="button-letter">Zaloguj się</button>
          </span>

          {error && (error !== null || error !== "" || error !== {}) && (
            <ErrorMessage errorMessage="cos poszło nie tak" />
          )}

          {errorPassword && (errorPassword !== null || errorPassword !== "" || errorPassword !== {}) && (
            <ErrorMessage errorMessage={errorPassword} />
          )}


          <div className="label-wrapper-register">
            Nie masz jeszcze konta?<Link to="/register">
              <span> zarejestruj się</span>
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.errors,
});


export default connect(mapStateToProps, { loginUser })(LoginPage);
