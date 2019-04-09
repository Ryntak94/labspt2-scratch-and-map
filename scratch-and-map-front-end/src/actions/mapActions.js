import axios from 'axios';

export const FETCHING = 'FETCHING';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR'

export const getUserData = (id) => {
    return dispatch => {
        dispatch({ type: FETCHING });
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/api/users/${id}`)
            .then(response => {
                console.log(response)
                dispatch({ type: SUCCESS, payload: response.data})
            })
            .catch(err => {
                dispatch({type: ERROR, payload: 'Error in getUserData API call'})
            })
    }
}