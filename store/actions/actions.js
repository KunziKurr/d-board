export const ADD_TOKEN = 'ADD_JWT_TOKEN'
export const ADD_USER_DATA = 'ADD_USER_DATA'




export const addToken = (token) => dispatch => {
    console.log(token)
    dispatch({
        type: ADD_TOKEN,
        payload: token,
    });
}
export const addUserData = (user) => dispatch => {
    dispatch({
        type: ADD_USER_DATA,
        payload: user,
    });
}