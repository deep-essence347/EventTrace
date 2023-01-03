import { DateTime } from "../../data/classes";
import { ActionTypes } from "../constants/actionTypes";

const initialState = {
	events: [],
	createdEvents: [],
	registeredEvents: [],
	interestedEvents: [],
};

export const eventReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.EVENT.ALL_EVENTS:
			state.events = [...payload];
			return state;
		case ActionTypes.EVENT.SET_INTERESTED:
			state.interestedEvents = [...payload];
			return state;
		case ActionTypes.EVENT.SET_REGISTERED:
			state.registeredEvents = [...payload];
			return state;
		case ActionTypes.EVENT.SET_CREATED:
			state.createdEvents = [...payload];
			return state;
		case ActionTypes.EVENT.CREATE_EVENT:
			state.events.push(payload);
			state.createdEvents.push(payload);
			return state;
		case ActionTypes.EVENT.UPDATE_EVENT:
			state.events = state.events.filter((event) => event.id !== payload.id);
			state.events.unshift(payload);
			state.createdEvents = state.createdEvents.filter(
				(event) => event.id !== payload.id
			);
			state.createdEvents.unshift(payload);
			return state;
		case ActionTypes.EVENT.UPDATE_INTERESTED:
			if (payload.action === "union")
				state.interestedEvents.unshift(payload.event);
			else if (payload.action === "remove")
				state.interestedEvents = state.interestedEvents.filter(
					(event) => event.id !== payload.event.id
				);
			return state;
		case ActionTypes.EVENT.UPDATE_REGISTERED:
			if (payload.action === "union")
				state.registeredEvents.unshift(payload.event);
			else if (payload.action === "remove")
				state.registeredEvents = state.registeredEvents.filter(
					(event) => event.id !== payload.event.id
				);
			return state;
		case ActionTypes.EVENT.REMOVE_EVENT:
			state.events = state.events.filter((event) => event.id !== payload);
			state.createdEvents = state.createdEvents.filter(
				(event) => event.id !== payload
			);
			return state;
		default:
			return state;
	}
};

export const getFutureEvents = (state) =>
	state.events.events.filter(
		(event) =>
			DateTime.isAfter(event.dateTime.startDate) &&
			DateTime.isAfter(event.dateTime.endDate)
	);
