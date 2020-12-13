import {MAKE_POST ,POST_ERROR ,GET_USER_POSTS ,REMOVE_POST ,GET_POSTS ,GET_POST ,CLEAR_POSTS ,CLEAR_POST, SEARCH_TOPICS ,MOST_LIKED_POSTS
     ,MOST_COMMENTED ,ADD_LIKE ,THE_MOST_RECENT_POSTS ,REMOVE_LIKE ,ADD_COMMENT ,GET_POST_BY_USER_ID ,LIKE_COMMENT ,REMOVE_LIKE_FROM_COMMENT, REMOVE_COMMENT} from '../constants/posts.constants';

const initialState = {
    posts: {},
    post: null,
    isLoading: false,
    errors: {},
};
const posts = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case MAKE_POST:
        case GET_POST: 
        case REMOVE_LIKE_FROM_COMMENT:
            return {
                ...state,
                post: payload,
                isLoading: false,
                errors: {},
            }
        case GET_POSTS:
        case THE_MOST_RECENT_POSTS:
        case SEARCH_TOPICS:
        case MOST_COMMENTED:
        case MOST_LIKED_POSTS:
            return {
                ...state,
                posts: payload,
                errors: {},
                isLoading: false,
            }
        case CLEAR_POSTS:
            return {
                ...state,
                posts: [],
                errors: {},
            }
        case CLEAR_POST: {
            return {
                ...state,
                post: null,
                errors: {},
            }
        }
        case POST_ERROR:
            return {
                ...state,
                errors: payload,
                isLoading: true,
            }

        default: 
            return state;
    }
}

export default posts; 