import { ActionTypes } from "../constants/actionTypes";

const initialState = {
	loggedIn: false,
	currentUser: {},
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.USER.SET_LOGIN:
			state.loggedIn = true;
			state.currentUser = payload;
			return state;
		case ActionTypes.USER.UPDATE_USER:
			state.currentUser = payload;
			return state;
		case ActionTypes.USER.LOGOUT:
			state.loggedIn = false;
			state.currentUser = {};
			return state;
		default:
			return state;
	}
};
