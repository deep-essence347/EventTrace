import { ActionTypes } from "../constants/actionTypes";

export const setLogin = (user) => {
	return {
		type: ActionTypes.USER.SET_LOGIN,
		payload: user,
	};
};

export const updateCurrentUser = (user) => {
	return {
		type: ActionTypes.USER.UPDATE_USER,
		payload: user,
	};
};

export const setLogout = () => {
	return {
		type: ActionTypes.USER.LOGOUT,
		payload: null,
	};
};
