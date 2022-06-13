export const SHOW_POST_JOB = 'SHOW_POST_JOB'
export const SHOW_DEADLINE = 'SHOW_DEADLINE'
export const SHOW_DESCRIPTION = 'SHOW_DESCRIPTION'
export const SHOW_UPLOAD_FILE = 'SHOW_UPLOAD_FILE'
export const SHOW_ASSIGNEE = 'SHOW_ASSIGNEE'
export const SHOW_SUCCESS = 'SHOW_SUCCESS'
export const TOGGLE_ADD_WRITER = "TOGGLE INVITER WRITER"




export const showPostJob = launch => dispatch => {
    dispatch({
        type: SHOW_POST_JOB,
        payload: launch,
    });
}

export const showDeadline = launch => dispatch => {
    dispatch({
        type: SHOW_DEADLINE,
        payload: launch,
    });
}

export const showDescription = launch => dispatch => {
    dispatch({
        type: SHOW_DESCRIPTION,
        payload: launch,
    });
}
export const showUploadfile = launch => dispatch => {
    dispatch({
        type: SHOW_UPLOAD_FILE,
        payload: launch,
    });
}
export const showAssignee = launch => dispatch => {
    dispatch({
        type: SHOW_ASSIGNEE,
        payload: launch,
    });
}
export const showSuccess = launch => dispatch => {
    dispatch({
        type: SHOW_SUCCESS,
        payload: launch,
    });
}
export const toggleWriter = toggle => dispatch => {
    dispatch({
        type: TOGGLE_ADD_WRITER,
        payload: toggle,
    });
}