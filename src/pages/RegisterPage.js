import React, { useState } from 'react'
import {connect} from 'react-redux';
import {registerUser} from '../actions/auth.actions';
import ErrorMessage from '../components/ErrorMessage';
const RegisterPage = ({registerUser, error }) => {
    const [hasPasswordShowed, setShowPassword] = useState(false);

    const [userData, setUserData] = useState({
      name: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
    });
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
  
    const { name, lastName, userName, email, password } = userData;
  
    const onChange = (e) =>
      setUserData({ ...userData, [e.target.name]: e.target.value });
  
    const register = () => {
        let flag = true;
        setErrorPassword('')
        const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
        if (!reg.test(email)) {
          flag = false;
          setErrorPassword("Wypełnij poprawnie pole z emailem");
          return;
        }
        if(password!==repeatPassword){
          flag = false;
          setErrorPassword('Hasło nie pasuje')
          return;
        }
        if(name.length<2 || lastName.length<2 || userName.length<2 || password.length<2){
          flag = false;
          setErrorPassword('Za krótka nazwa')
          return;
        }
        if(password.indexOf("-")>0 || password.indexOf("=")>0){
          flag = false;
          setErrorPassword('Niezgodne znaki')
          return;
        }
        if(flag){
          registerUser(userData)
        }
    
    }

    return (
      <main className="register-page-wrapper">
        <form className="register-section">
          <div className="inputs-wrapper">
            <header className="register-header-wrapper">
              <p className="font__p p__size register-header">
                <i className="fas fa-users users-icon app_color_font"></i>
                Zarejestruj się
              </p>
            </header>
  
           <div className="container-register">
           <div className="label-wrapper">
              <label className="label__register p__size">Imię:</label>
            </div>
  
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
            />
            <div className="label-wrapper">
              <label className="label__register">Nazwisko:</label>
            </div>
            <input
              type="text"
              value={lastName}
              name="lastName"
              onChange={(e) => onChange(e)}
            />
            <div className="label-wrapper">
              <label className="label__register">Nazwa:</label>
            </div>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(e) => onChange(e)}
            />
            <div className="label-wrapper">
              <label className="label__register">E-mail:</label>
            </div>
            <input
              name="email"
              value={email}
              type="email"
              onChange={(e) => onChange(e)}
            />
            <div className="label-wrapper">
              <label className="label__register">Hasło:</label>
            </div>
            <input
              name="password"
              type={hasPasswordShowed ? "text" : "password"}
              value={password}
              onChange={(e) => onChange(e)}
            />
            <div className="label-wrapper">
              <label className="label__register">Powtórz hasło:</label>
            </div>
            <input
              name="repeatPassword"
              type={hasPasswordShowed ? "text" : "password"}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
            />
  
            <i
              onClick={() => setShowPassword(!hasPasswordShowed)}
              className={hasPasswordShowed ? "fas fa-eye" : "fas fa-eye-slash"}
            ></i>
                <div
              onClick={() => register()}
            >
              <p className="button-register">Zarejestruj się</p>
            </div>
           </div>

            {/* <div className="label-wrapper">
              <p className="p__size font__p password__info">
                <i className="fas fa-user-check app_color_font"></i> Password must
                have at least 6 letters
              </p>
            </div> */}
  
            {errorPassword && (errorPassword !== null || errorPassword !== "" || errorPassword !== {}) && (
                <ErrorMessage errorMessage={errorPassword}/>
            )}
  
            {error && (error !== null || error !== "" || error !== {}) && (
                <ErrorMessage errorMessage="Coś poszło nie tak"/>
            )}
  
        
          </div>
        </form>
      </main>
    );
  };
  
  const mapStateToProps = (state) => ({
    error: state.auth.errors,
  });

export default connect(mapStateToProps, {registerUser})(RegisterPage)
