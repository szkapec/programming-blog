import React, { useEffect } from "react";
import { connect } from "react-redux";
import {getUserById} from '../actions/users.actions';
import { getUserPostsById , getUserPosts } from "../actions/users.actions";
import Spinner from "../Spinner";
import UserPostsWrapper from "./UserPostsWrapper/UserPostsWrapper";
import styled from 'styled-components';

const UserProfile = ({
  users,
  userProfile,
  posts: { post },
  match,
  getUserById,
  getUserPostsById,
}) => {
  useEffect(() => {
    getUserById(match.params.user_id);
    getUserPostsById(match.params.user_id);
  }, []);

  return users.profilePosts === [] ||
    userProfile === null ||
    post === users.profilePosts ? (
    <div className="all-page-wrapper">
      <Spinner />
    </div>
  ) :  (
    <StyledContainerAccount className="account-page-wrapper">
      <div className="data">
        <img src={userProfile.avatar} alt="profile avatar" />
        
        <div className="data-items">
                <div>
                        Imię: {userProfile.name}
                </div>
                <div>
                        Nazwisko: {userProfile.lastName}
                </div>
                <div>
                        Nazwa użytkownika: {userProfile.userName}
                </div>
                <div>
                        Email: {userProfile.email}
                </div>
                <div>
                        Admin: nie
                </div>
                <div>
                        Premium: nie
                </div>
            </div>


        <div className="user-posts">
          <header className="user-posts-header-wrapper">
          {post !== null || post !== [] ? (
              <div></div>
            ) : (
              <p className="user-posts-header">
                Brak postów
              </p>
            )}
          </header>
            <UserPostsWrapper posts={users.profilePosts} />
        </div>
      </div>
    </StyledContainerAccount>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
  userProfile: state.users.userProfile,
  posts: state.posts,
});

export default connect(mapStateToProps, { getUserById, getUserPostsById })(
  UserProfile
);


const StyledContainerAccount = styled.div`
  max-width: 700px;
  width: 90%;
  margin: 0 auto;
    img {
      width: 150px;
      height: 150px;
      margin-left: 10px;
    }
`