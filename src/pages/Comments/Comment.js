import React from 'react'
import Moment from 'react-moment';
import {connect} from 'react-redux';
import {addLikeToComment, removeLikeFromComment } from '../../actions/posts.actions';
import Spinner from '../../Spinner'
const Comment = ({ comment, auth, addLikeToComment, removeLikeFromComment, post }) => {


    return (post === null || post === [] ? (<div className="all-page-wrapper flex__center">
        <Spinner/>
    </div>) : (
        <div key={comment._id} className="comment-container">
            <div className="topic-wrapper">
               
            </div>
            <div className="topic-cl">
                <img className="comment-img" src={comment.avatar} alt="avatar" />
                <div className="comment">
                    <div className="date"><Moment format="HH:mm YYYY-MM-DD">{comment.date}</Moment></div>
                    <p className="comment-name">{comment.name}</p>
                    <p className="comment-text">{comment.textOfTheComment}</p>
                    <div className="topic-section-link">
                    <div onClick={() => {
                        if (comment.likes.find((like) => like.user === auth.user._id)) {
                            comment.likes.find((like) =>
                              removeLikeFromComment(post._id, comment._id, like._id)
                            );
                            
                        } else if (!auth.user.name){
                            alert("Zaloguj się")
                        } else {
                            addLikeToComment(post._id, comment._id)
                        }
                    }}>
                        <i
                            className={
                                comment.likes.find(like => like.user === auth.user._id) ? "fas fa-thumbs-up" : "far fa-thumbs-up"
                            }
                        ></i>
                        {comment.likes.length}
                    </div>
                </div>
                </div>
            </div>
           
        </div>)
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.posts.post,
})
const mapDispatchToProps = {
    removeLikeFromComment,
    addLikeToComment

};
export default connect(mapStateToProps, mapDispatchToProps)(Comment)
