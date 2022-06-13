export const POST_NEW_JOB = 'POST NEW JOB'



export const addUserData = (jobdata) => dispatch => {
    console.log("Action Was Received")
    dispatch({
        type: POST_NEW_JOB,
        payload: jobdata,
    });

}