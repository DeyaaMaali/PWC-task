import * as actionTypes from './actionTypes';

export const sidebarToggle = (val) => {
    return {
        type: actionTypes.TOGGLE_SLIDEBAR,
        sidebarShow: val
    };
};
