import {
    ADD_USER_DATA,
    ADD_TOKEN
} from '../actions/actions';

const initialState = {
    token: '',
    userData: []
};

function useReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_TOKEN:
            console.log([action.payload])
            return {
                ...state,
                token: action.payload
            };

        case ADD_USER_DATA:
            return {
                ...state,
                userData: action.payload
            };

        default:
            return state;
    }
}
export default useReducer;