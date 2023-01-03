import { ActionTypes } from "../redux/constants/actionTypes";
import { REQUEST, request } from "./axios";

/** If no data is to be passed, send an empty object
 * Example: EventRequest(ActionTypes.EVENT.ALL_EVENTS, {data: {} });
 * */
export const EventRequest = async (actionType, { data }) => {
	const initial = "events";
	switch (actionType) {
		case ActionTypes.EVENT.ALL_EVENTS:
			return await request(REQUEST.GET, { url: `${initial}` });
		case ActionTypes.EVENT.CREATE_EVENT:
			return await request(REQUEST.POST, {
				url: `${initial}/create`,
				data: !data ? {} : data,
			});

		default:
			return;
	}
};
