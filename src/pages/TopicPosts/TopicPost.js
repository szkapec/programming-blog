import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLike } from "../../actions/posts.actions";
import { removeLikeFromPost } from "../../actions/posts.actions";
import Spinner from '../../Spinner';
const TopicPost = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostLiked,
  post,
  removeLikeFromPost,
  addLike,
  auth,
  posts
}) => {
  return post === null || post === [] ? (<div className="all-page-wrapper">
  <Spinner />
</div>) : (<div className="topic-wrapper">
      
      <div>{post.image&&<img className="topic-section-image" src={post.image} alt="user image"/>}</div>

    <div className="topic-user">
      <img src={post.avatar} className="topic-avatar" alt="avatar" />
      <Link to={`/users/user/${post.user}`}><p className="post-name">{post.name}</p></Link>
      <div className="topic-date">
      <Moment format="HH:mm YYYY-MM-DD">{post.data}</Moment>
    </div>
    </div>
    <div className="title">
       {post.title}
    </div>
    <div className="topic-section">
      <p>{post.textOfThePost}</p>
    
      <div className="topic-section-links">

        <div className="like-posts">
        <div>
          <i className="fas fa-thumbs-up like-post" style={{color:'#026ee2'}}></i>
          <i className="fab fa-gratipay heart-post" style={{color:'red'}}></i>
          <span className="like-post-comment-top">{post.likes.length} </span>
        </div>

        <span className="like-post-comment"> <Link to={`/topics/topic/${post._id}`}> Komentarze: {post.comments.length}</Link></span>
        </div>

        <div className="like-section" style={{ color: "rgb(42, 9, 9)" }}>
     
          <div className="like-container"
            onClick={() => {
              if (post.likes.find((like) => like.user === auth.user._id)) {
                
                post.likes.find((like) =>
                  removeLikeFromPost(
                    post._id,
                    like._id,
                    isTheOldest,
                    isTheMostRecent,
                    isTheMostCommented,
                    isTheMostLiked
                  )
                );
              } else if (!auth.user.name){
                alert("Zaloguj się")
              } else {
                addLike(
                  post._id,
                  isTheOldest,
                  isTheMostRecent,
                  isTheMostCommented,
                  isTheMostLiked
                );
              }
            }}
          >
              <div className={
                post.likes.find((like) => like.user === auth.user._id)
                  ? "like"
                  : "none"
              }></div>
              
            <i
              className={
                post.likes.find((like) => like.user === auth.user._id)
                  ? "fas fa-thumbs-up active-like"
                  : "far fa-thumbs-up"
              }
            ></i>
            <span className={
                post.likes.find((like) => like.user === auth.user._id)
                  ? "like-user-title" : "comment-user-title"
              } >Lubię to!</span>
          </div>
          
         
          <div className="topic-comment-section">
          <Link to={`/topics/topic/${post._id}`}  style={{textDecoration:'none', color:'black'}}>
            <i className="far fa-comment"></i>
            <span className="comment-user-title">Dodaj komentarz</span>
            {/* <div>{post.comments.length}</div> liczba komentarzy */ }
          </Link>
            
          </div>
        </div>



        <div className="link-to-post-page-button">
          <Link to={`/topics/topic/${post._id}`}>Więcej <i className="fas fa-long-arrow-alt-right"></i></Link>
        </div>
      </div>
    </div>
  </div>
    
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  posts: state.posts,
});

const mapDispatchToProps = {
  addLike,
  removeLikeFromPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicPost);