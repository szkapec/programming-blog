import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { logOut } from '../actions/auth.actions';
import styled from 'styled-components';
import './scss/Navbar.css';
const Navbar = ({ auth: { isLoggedIn }, logOut }) => {
  let [isSidebar, setSidebar] = useState(true);


  return (
    <nav>
      <BarStyleMenu>
        <NavLink to="/" className="href__style__remove nav__link" onClick={() => setSidebar(true)} 
         exact activeStyle={{
          color: '#2980b9',
          borderBottom: '1px solid #2980b9'
        }}>
          
        <i className="fas fa-home"></i>
        </NavLink>

        <NavLink to="/users" className="href__style__remove nav__link" onClick={() => setSidebar(true)}
        style={{ display: isLoggedIn ? "flex" : "none" }} activeStyle={{
          color: '#2980b9',
          borderBottom: '1px solid #2980b9'
        }}>
          <i className="fas fa-users"></i>
        </NavLink>

        <NavLink to="/topics" className="href__style__remove nav__link" onClick={() => setSidebar(true)} activeStyle={{
          color: '#2980b9',
          borderBottom: '1px solid #2980b9'
        }}>
          <i className="fas fa-comments"></i>
        </NavLink>

        <NavLink
          to="/login"
          className="href__style__remove nav__link" onClick={() => setSidebar(true)} activeStyle={{
            color: '#2980b9',
            borderBottom: '1px solid #2980b9'
          }}
          style={{ display: isLoggedIn ? "none" : "flex" }}
        >
          <i className="fas fa-long-arrow-alt-right"></i>
          </NavLink>

        <NavLink
          to="/register"
          className="href__style__remove nav__link" onClick={() => setSidebar(true)} activeStyle={{
            color: '#2980b9',
            borderBottom: '1px solid #2980b9'
          }}
          style={{ display: isLoggedIn ? "none" : "flex" }}
        >
          <i className="fas fa-sign-in-alt"></i>
          </NavLink>

        <NavLink
          to="/account"
          className="href__style__remove nav__link" onClick={() => setSidebar(true)} activeStyle={{
            color: '#2980b9',
            borderBottom: '1px solid #2980b9'
          }}
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
        <i className="fas fa-address-card"></i>
        </NavLink>

        <NavLink
          to="/dashboard"
          className="href__style__remove nav__link" onClick={() => setSidebar(true)} activeStyle={{
            color: '#2980b9',
            borderBottom: '1px solid #2980b9'
          }}
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
        <i className="fas fa-user"></i>
        </NavLink>

        <NavLink
          to="/add-post"
          className="href__style__remove nav__link" onClick={() => setSidebar(true)} activeStyle={{
            color: '#2980b9',
            borderBottom: '1px solid #2980b9'
          }}
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
          <i className="fas fa-edit"></i>
        </NavLink>

        <NavLink
          to="/login"
          className="href__style__remove nav__link" onClick={() => setSidebar(true)} activeStyle={{
            color: '#2980b9',
            borderBottom: '1px solid #2980b9'
          }}
          onClick={() => logOut()}
          style={{ display: isLoggedIn ? "flex" : "none" }}
        >
          <i className="fas fa-sign-out-alt"></i>
        </NavLink>
      </BarStyleMenu>


      <BarStyle isSidebar={isSidebar} className="menu" >

        <div><i className={"fas fa-ellipsis-h"} onClick={() => setSidebar(!isSidebar)}></i></div>
      </BarStyle>
      <NavStyle isSidebar={isSidebar} className="main__nav">
        <div className="nav-container">
          <Link to="/" className="href__style__remove nav__link" onClick={() => setSidebar(true)}>
            Główna <i className="fas fa-home"></i>
          </Link>

          <Link to="/users" className="href__style__remove nav__link" onClick={() => setSidebar(true)}
           style={{ display: isLoggedIn ? "flex" : "none" }}>
            Użytkownicy <i className="fas fa-users"></i>
          </Link>

          <Link to="/topics" className="href__style__remove nav__link" onClick={() => setSidebar(true)}
          >
            Posty <i className="fas fa-comments"></i>
          </Link>

          <Link
            to="/login"
            className="href__style__remove nav__link" onClick={() => setSidebar(true)}
            style={{ display: isLoggedIn ? "none" : "flex" }}
          >
            Zaloguj <i className="fas fa-long-arrow-alt-right"></i>
          </Link>

          <Link
            to="/register"
            className="href__style__remove nav__link" onClick={() => setSidebar(true)}
            style={{ display: isLoggedIn ? "none" : "flex" }}
          >
            Zarejestruj się <i className="fas fa-sign-in-alt"></i>
          </Link>

          <Link
            to="/account"
            className="href__style__remove nav__link" onClick={() => setSidebar(true)}
            style={{ display: isLoggedIn ? "flex" : "none" }}
          >
            Konto <i className="fas fa-address-card"></i>
          </Link>

          <Link
            to="/dashboard"
            className="href__style__remove nav__link" onClick={() => setSidebar(true)}
            style={{ display: isLoggedIn ? "flex" : "none" }}
          >
            Profil <i className="fas fa-user"></i>
          </Link>

          <Link
            to="/add-post"
            className="href__style__remove nav__link" onClick={() => setSidebar(true)}
            style={{ display: isLoggedIn ? "flex" : "none" }}
          >
            Dodaj post <i className="fas fa-edit"></i>
          </Link>

          <Link
            to="/login"
            className="href__style__remove nav__link" onClick={() => setSidebar(true)}
            onClick={() => logOut()}
            style={{ display: isLoggedIn ? "flex" : "none" }}
          >
            Wyloguj <i className="fas fa-sign-out-alt"></i>
          </Link>
        </div>
      </NavStyle>
    </nav>
  );
};
const mapStateToProps = state => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logOut })(Navbar)


const NavStyle = styled.div`
  transform: ${props => props.isSidebar ? 'translateY(-120%)' : 'translateY(0%)'};
  transition: .6s ease-in-out;

  @media (min-width: 1200px) {
    transform: translate(0%)
  }
`
const BarStyleMenu = styled.div`
    
    display: none;
    a {
      text-decoration: none;
    }
    @media(min-width: 290px){
      position: fixed;
      top: 0;
      z-index: 99999;
      display: flex;
      left: 10px;
      right: 100px;
      width: 75%;
      align-items: center;
      height: 45px;
      justify-content: space-around;
      align-items: center;
      a {
        color: black;
     
      }
    }
    @media(min-width:550px) {
      width: 85%;
      left:30px;
      display: flex;
      font-size: 20px;
    }
    @media(min-width: 1200px) {
      display: none;
    }
   
`

const BarStyle = styled.div`
  i {
    transition: .5s ease-in-out;
    transform: ${props => !props.isSidebar ? 'rotate(90deg)' : 'rotate(0deg)'}
  }

`