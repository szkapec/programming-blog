import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { clearPost, getPost, removeLikeFromPost, addLikeToTopicPage, createComment } from '../actions/posts.actions';
import Spinner from '../Spinner';
import Moment from 'react-moment';
import CommentsWrapper from './Comments/CommentsWrapper';
import './scss/TopicsPage/topicsPage.css';
import { Link } from 'react-router-dom';

const TopicsPage = ({ clearPost, removeLikeFromPost, getPost, match, auth, post, addLikeToTopicPage, createComment }) => {

    useEffect(() => {
        clearPost()
        getPost(match.params.topic_id)
    }, [])

    let [textOfTheComment, setTextOfTheComment] = useState('')
    const onChange = (e) => setTextOfTheComment(e.target.value)


    return post === null || post === [] ? (<div className="all-page-wrapper">
        <Spinner />
    </div>) : (
            <div className="topic-container">
                <div className="topic-wrapper">


                    <div className="topic-user-container">
                        <img className="avatar" src={post.avatar} alt="avatar" />
                        <Link to={`/users/user/${post.user}`}><p>{post.name}</p></Link>
                    </div>
                </div>
                <div className="topic-section">

                    <div className="title">{post.title}</div>
                    <div className="link-user">
                        <Link to={`/users/user/${post.user}`}><b>{post.name}</b></Link>
                        <Moment format="HH:mm YYYY-MM-DD">{post.data}</Moment>
                    </div>
                    <div>
                        {post.image && <img className="user-image" src={post.image} />}
                    </div>
                    <p>{post.textOfThePost}</p>

                    <div className="like-posts">
                        <div>
                            <i className="fas fa-thumbs-up like-post" style={{ color: '#026ee2' }}></i>
                            <i className="fab fa-gratipay heart-post" style={{ color: 'red' }}></i>
                            <span className="like-post-comment-top">{post.likes.length} </span>
                        </div>
                        <span className="like-post-comment"> Komentarzy: {post.comments.length}</span>
                    </div>
                    <div className="topic-section link">
                        <div className={
                            post.likes.find((like) => like.user === auth.user._id)
                                ? "like"
                                : "none"
                        }></div>
                        <p onClick={() => {
                            if (post.likes.find(like => like.user === auth.user._id)) {
                                post.likes.find(like => removeLikeFromPost(post._id, like._id))
                            } else if (!auth.user.name) {
                                alert("Zaloguj się")
                            } else {
                                addLikeToTopicPage(post._id)
                            }
                        }}>
                            <i
                                className={
                                    post.likes.find(like => like.user === auth.user._id) ? "fas fa-thumbs-up active" : "far fa-thumbs-up no-active"
                                }
                            ></i>

                            <span className={
                                post.likes.find((like) => like.user === auth.user._id)
                                    ? "like-user-title" : "comment-user-title"
                            }>Lubię to!</span>
                        </p>
                    </div>
                </div>
                <div>
                    <form style={{ display: auth.isLoggedIn ? "grid" : "none" }} className="search-topic-wrapper">

                        <input placeholder="Napisz komentarz..." value={textOfTheComment} onChange={(e) => onChange(e)} />
                        <button onClick={(e) => {
                            e.preventDefault();
                            createComment(textOfTheComment, post._id)
                            setTextOfTheComment('')
                        }}> Dodaj komentarz</button>
                    </form>
                </div>
                {console.log(post.comments)}
                {post.comments.length > 0 && <div className="topic-comment-container">
                    <CommentsWrapper comments={post.comments} />
                </div>}
            </div>
        )
}

const mapDispatchToProps = ({
    clearPost,
    getPost,
    removeLikeFromPost,
    addLikeToTopicPage,
    createComment,
})
const mapStateToProps = (state) => ({
    post: state.posts.post,
    auth: state.auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(TopicsPage)
