import React, {useEffect} from 'react'
import {connect} from 'react-redux';
import { getUserPosts } from '../actions/users.actions';
import UserPostsWrapper from './UserPostsWrapper/UserPostsWrapper'
import './scss/Account/Account.css';

const AccountPage = ({getUserPosts, auth: {name,lastName,email,userName, avatar}, users: {profilePosts}}) => {


    useEffect(() => {
        getUserPosts();
    },[])
    return (
        <div className="account-page-wrapper">
        <div className="data">
            <div className="data-items">
                <div className="your-account">Twoje konto</div>
                <div>
                        Imię: {name}
                </div>
                <div>
                        Nazwisko: {lastName}
                </div>
                <div>
                        Nazwa użytkownika: {userName}
                </div>
                <div>
                        email: {email}
                </div>
            </div>
        </div>
  
        <div className="user-posts">
          <header className="user-posts-header">
            {profilePosts === [] || profilePosts === null || profilePosts === "" || profilePosts.length===0 ? (
              <p className="user-posts-header">
              Nie masz jeszcze żadnych postów
            </p>
            ) : (
              <p className="user-posts-header">Twoje posty</p>
            )}
          </header>
          <UserPostsWrapper posts={profilePosts}/>
        </div>
      </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    users: state.users,
})

export default connect(mapStateToProps, {getUserPosts})(AccountPage)
