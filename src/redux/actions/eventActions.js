import { ActionTypes } from "../constants/actionTypes";

export const createEvent = (event) => {
	return {
		type: ActionTypes.EVENT.CREATE_EVENT,
		payload: event,
	};
};

export const updateEvent = (event) => {
	return {
		type: ActionTypes.EVENT.UPDATE_EVENT,
		payload: event,
	};
};

export const allEvents = (events) => {
	return {
		type: ActionTypes.EVENT.ALL_EVENTS,
		payload: events,
	};
};

export const setInterestedEvents = (events) => {
	return {
		type: ActionTypes.EVENT.SET_INTERESTED,
		payload: events,
	};
};

export const setRegisteredEvents = (events) => {
	return {
		type: ActionTypes.EVENT.SET_REGISTERED,
		payload: events,
	};
};

export const setCreatedEvents = (events) => {
	return {
		type: ActionTypes.EVENT.SET_CREATED,
		payload: events,
	};
};

export const updateInterested = (payload) => {
	return {
		type: ActionTypes.EVENT.UPDATE_INTERESTED,
		payload: payload,
	};
};

export const updateRegistered = (payload) => {
	return {
		type: ActionTypes.EVENT.UPDATE_REGISTERED,
		payload: payload,
	};
};

export const removeEvent = (eventID) => {
	return {
		type: ActionTypes.EVENT.REMOVE_EVENT,
		payload: eventID,
	};
};
