import { AUTH_FORM_SUCCESS, AUTH_FORM_FAIL, AUTH_ERROR, USER_IS_LOADED,
     LOG_OUT, CHECK_PASSWORDS, CHANGE_PASSWORD, CHANGE_PASSWORD_FAIL, CHAGE_USER_DATA_FAILED, CHANGE_PROFILE, GET_USERS, SEARCH_BY_USERNAME} from '../constants/auth.constants';
import axios from 'axios';
import setAuthenticationToken from '../middleware/setAuthenticationToken';

const API = 'https://backend-post.herokuapp.com';

export const userLoaded = () => async (dispatch) => {
    if(localStorage.getItem("token")) {
        setAuthenticationToken(localStorage.getItem("token"))
    }
    try {
      const response = await axios.get(`${API}/api/users`) //znajdz tego konkretnego uzytkownika
      dispatch({
          type: USER_IS_LOADED,
          payload: response.data
      })
    } catch (error) {
        dispatch({
            type: AUTH_FORM_FAIL,
        })
    }
}


export const registerUser = (userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const body = JSON.stringify(userData) //caly obiekt imie naziwsko email haslo itd
        const response = await axios.post(`${API}/api/users/register`, body, config);

        dispatch({ //wysyla do reducera
            type: AUTH_FORM_SUCCESS,
            payload: response.data
        })
        dispatch(userLoaded())

    } catch (error) {
        dispatch({ //wysyla do reducera
            type: AUTH_FORM_FAIL,
            payload: error
        })
    }
}

export const loginUser = (userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };

        const body = JSON.stringify(userData) //caly obiekt imie naziwsko email haslo itd
        const response = await axios.post(`${API}/api/users/login`, body, config);
        dispatch({
            type: AUTH_FORM_SUCCESS,
            payload: response.data
        })
        dispatch(userLoaded())
    } catch (error) {
        dispatch({
            type: AUTH_FORM_FAIL,
            payload: error
        })
    }
}

export const checkPasswords = (passwordToCheck) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const body = JSON.stringify({passwordToCheck})
        const res = await axios.put(`${API}/api/users/check_actual_password`, body, config)
        dispatch({
            type: CHECK_PASSWORDS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            payload: error
        })
    }
}
export const changePassword = (newPassword) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const body = JSON.stringify({newPassword})
        const res = await axios.put(`${API}/api/users/change_user_password`, body, config)
        dispatch({
            type: CHANGE_PASSWORD,
            payload: res.data
        })
        dispatch(userLoaded())
    } catch (error) {
        dispatch({
            type: CHANGE_PASSWORD_FAIL,
            payload: error
        })
    }
}

export const changeUserData = (changeUserData, userDataToChange) => async (dispatch) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        };
        const body = JSON.stringify({changeUserData})
        const res = await axios.put(`${API}/api/users/change_user_data/${userDataToChange}`, body, config)
        dispatch({
            type: CHANGE_PROFILE,
            payload: res.data
        })
        alert("Dane zosytały zmienione")
    } catch (error) {
        dispatch({
            type: CHAGE_USER_DATA_FAILED,
            payload: error
        })
    }
}


export const logOut = () => (dispatch) => {
    dispatch({type:LOG_OUT});
}
