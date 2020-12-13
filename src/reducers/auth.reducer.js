import { AUTH_FORM_SUCCESS, AUTH_FORM_FAIL, AUTH_ERROR, USER_IS_LOADED, LOG_OUT, CHECK_PASSWORDS, 
    CHANGE_PASSWORD, CHANGE_PASSWORD_FAIL, CHAGE_USER_DATA_FAILED, CHANGE_PROFILE, GET_USERS, SEARCH_BY_USERNAME} from '../constants/auth.constants';

const initialState = {
    token: localStorage.getItem("token"),
    users: {},
    user: {},
    isLoggedIn: false,
    isAllowedToChangePassword: false,
    isPasswordChanged: false,
    isLoading: false,
};

const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case GET_USERS: 
        case SEARCH_BY_USERNAME:
            return {
                ...state,
                users: [...payload],
                isLoggedIn: true,
                isAllowedToChangePassword: false,
                isPasswordChanged: false,
                isLoading: false,
                errors: null,
            }
        case AUTH_FORM_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isLoggedIn: true,
                isAllowedToChangePassword: false,
                isPasswordChanged: false,
                isLoading: false,
                errors: {},
              };
        case CHECK_PASSWORDS: 
              return {
                  ...state,
                  ...payload,
                  isAllowedToChangePassword: true,
              }
        case CHANGE_PROFILE: 
              return {
                  ...state,
                  ...payload,
                  isLoggedIn: true,
                  isAllowedToChangePassword: false,
                  isPasswordChanged: false,
                  isLoading: false,
                  errors: {},
              }
        case AUTH_FORM_FAIL:
        case AUTH_ERROR:
        case LOG_OUT:
            localStorage.removeItem('token')
            return {
                ...state,
                ...payload,
                user: {},
                isLoggedIn: false,
                isAllowedToChangePassword: false,
                isPasswordChanged: false,
                isLoading: false,
            }
        case CHANGE_PASSWORD_FAIL:
        case CHAGE_USER_DATA_FAILED: 
        return {
            ...state,
            errors: payload,
        }
        case USER_IS_LOADED:
            return {
                ...state,
                ...payload,
                user: payload,
                isLoggedIn: true,
                isAllowedToChangePassword: false,
                isPasswordChanged: false,
                isLoading: false,
            }

        default: 
            return state;
    }
}

export default auth