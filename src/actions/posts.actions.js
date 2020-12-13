import {MAKE_POST ,POST_ERROR ,GET_USER_POSTS ,REMOVE_POST ,GET_POSTS ,GET_POST ,CLEAR_POSTS ,CLEAR_POST, SEARCH_TOPICS ,MOST_LIKED_POSTS
    ,MOST_COMMENTED ,ADD_LIKE ,THE_MOST_RECENT_POSTS ,REMOVE_LIKE ,ADD_COMMENT ,GET_POST_BY_USER_ID ,LIKE_COMMENT ,REMOVE_LIKE_FROM_COMMENT, REMOVE_COMMENT} from '../constants/posts.constants';
import axios from 'axios';
import { getUserPosts, getUsers } from './users.actions';
const API = 'https://backend-post.herokuapp.com';

export const getPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/api/posts/posts`);
        dispatch({
           type: GET_POSTS, payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const getMostRecentPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/api/posts/posts/the_most_recent`);
        dispatch({
           type: THE_MOST_RECENT_POSTS, payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const getMostCommentedPosts = () => async (dispatch) => { //dziala
    try {
        const res = await axios.get(`${API}/api/posts/posts/the_most_commented`);
        dispatch({
           type: MOST_COMMENTED, payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const theMostLikedPosts = () => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/api/posts/posts/most_liked`);
        dispatch({
           type: MOST_LIKED_POSTS, payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const getPost = (post_id) => async (dispatch) => {
    try {
        const res = await axios.get(`${API}/api/posts/single_post/${post_id}`);
        dispatch({
           type: GET_POST, payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}

export const clearPost = () => async (dispatch) => {
    try {
        dispatch({
           type: CLEAR_POST,
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const clearPosts = () => async (dispatch) => {
    try {
        dispatch({
           type: CLEAR_POSTS,
        })
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const createPost = (textOfThePost, title, image) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({textOfThePost, title, image});
        const res = await axios.post(`${API}/api/posts/add`, body, config)

        dispatch({type: MAKE_POST, payload: res.data})
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}


export const createComment = (textOfTheComment, post_id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({textOfTheComment});
        const res = await axios.put(`${API}/api/posts/add_comment/${post_id}`, body, config)

        dispatch({type: ADD_COMMENT, payload: res.data})
        dispatch(getPost(post_id))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}

export const searchTopics = (searchInput) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({searchInput});
        const res = await axios.put(`${API}/api/posts/search_for_post`, body, config)

        dispatch({type: SEARCH_TOPICS, payload: res.data})
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}


export const addLikeToTopicPage = (post_id) => async (dispatch) => {
    try {
        const res = await axios.put(`${API}/api/posts/likes/${post_id}`)
        dispatch({type: ADD_LIKE, payload: res.data})
        dispatch(getPost(post_id))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: {
                error,
                error_message: 'Nie jesteś zalogowany',
            },
        })
    }
}

export const addLike = (post_id, isOldest, isMostRecent, isMostCommented, isMostLiked, searchInput) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({searchInput});
        const res = await axios.put(`${API}/api/posts/likes/${post_id}`, body, config)

        dispatch({type: ADD_LIKE, payload: res.data})
        if(isOldest){
            dispatch(getPosts())
        }
        else if (isMostRecent){
            dispatch(getMostRecentPosts())
        }
        else if (isMostCommented){
            dispatch(getMostCommentedPosts())
        }
        else if(isMostLiked){
            dispatch(theMostLikedPosts())
        }
        
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const addLikeToComment = (post_id, comment_id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put(`${API}/api/posts/like_comment/${post_id}/${comment_id}`, config)
        dispatch({type: LIKE_COMMENT, payload: res.data})
        dispatch(getPost(post_id))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}



export const removePost = (post_id) => async (dispatch) => {
    try {
        const res = await axios.delete(`${API}/api/posts/detele_post/${post_id}`)
        dispatch({type: REMOVE_POST, payload: res.data})

        dispatch(getUserPosts())
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const removeLikeFromPost = (post_id, like_id, isOldest, isMostRecent, isMostCommented, isMostLiked) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`${API}/api/posts/remove_like_from_post/${post_id}/${like_id}`, config)
        dispatch({
            type: REMOVE_LIKE,
            payload: res.data,
          });
            dispatch(getPost(post_id))
          if (isOldest) {
            dispatch(getPosts());
          } else if (isMostRecent) {
            dispatch(getMostRecentPosts());
          } else if (isMostCommented) {
            dispatch(getMostCommentedPosts());
          } else if (isMostLiked) {
            dispatch(theMostLikedPosts());
          }

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const removeComment = (post_id, comment_id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`${API}/api/posts/remove_comment/${post_id}/${comment_id}`, config)
        dispatch({type: REMOVE_COMMENT, payload: res.data})
        dispatch(getUserPosts())
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}
export const removeLikeFromComment = (post_id, comment_id, like_id) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.delete(`${API}/api/posts/remove_like_from_comment/${post_id}/${comment_id}/${like_id}`, config)
        dispatch({type: REMOVE_LIKE_FROM_COMMENT, payload: res.data})

    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: error,
        })
    }
}