import { combineReducers } from "redux";
import { eventReducer } from "./eventReducer";
import { userReducer } from "./userReducer";

const reducers = combineReducers({
	events: eventReducer,
	users: userReducer,
});

export default reducers;
