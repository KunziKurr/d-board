export const ADD_USER_DATA = 'ADD_USER_DATA'



export const addUserData = (userdata) => dispatch => {
    console.log("Addong" + userdata)
    dispatch({
        type: ADD_USER_DATA,
        payload: userdata,
    });

}