import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { removePost } from "../../actions/posts.actions";
import Spinner from "../../Spinner";
import Moment from "react-moment";

const UserPost = ({ post, removePost, auth }) => {
  return post === null || !post ? (
    <div className="all-page-wrapper">
      <Spinner />
    </div>
  ) : (
    <div className="user-post">
     

      <div className="user-post-topic">
        
        {post.image&& <div className="user-post-image"><img src={post.image} alt="image post"/></div>}
        <div className="title">{post.title}</div>
        <div className="text">{post.textOfThePost}</div>
      </div>
      <div className="user-post-date">
        <Moment format="HH:mm YYYY-MM-DD">{post.data}</Moment>
      </div>
      <div className="post__likes__comments">
        <div className="post__likes__comments__deleteBtn">
          <div className="user-post-likes">
            <i className="far fa-thumbs-up"></i> {post.likes.length}
          </div>
          <div className="user-post-comments">
            <i className="far fa-comment"></i>
            {post.comments.length}
          </div>

          <div
            style={{
              display: post.user === auth.user._id ? "block" : "none",
            }}
          >
            <div
              className="removePostBtn app_color_background"
              onClick={() => removePost(post._id)}
            >
              <i className="fas fa-times"></i>
            </div>
          </div>

          <div className="link-to-post-page-button">
            <Link to={`/topics/topic/${post._id}`}>Zobacz więcej</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  removePost,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPost);