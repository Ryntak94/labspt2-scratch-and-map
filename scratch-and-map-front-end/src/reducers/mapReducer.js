import { FETCHING, SUCCESS, ERROR } from '../actions/mapActions';

const initialState = {
    userData: [],
    userCountryData: [],
    loading: true,
    error: ''
}

export const getUserDataReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCHING: 
            return {...state, loading: true}
        case SUCCESS:
            return {...state, userData: action.payload, userCountryData: action.payload.user_countries ,loading: false}
        case ERROR:
            return {...state, error: action.payload, loading: false}
        default:
            return state;
    }
}