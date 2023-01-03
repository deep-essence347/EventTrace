import { Filter } from "../../../data/classes";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { readUserById, updateUser } from "../../../services/crud/user";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import {
	updateInterested,
	updateRegistered,
} from "../../../redux/actions/eventActions";
import { message } from "antd";
import { updateEvent } from "../../../services/crud/events";

export const useGetEvent = () => {
	const eventName = useParams().eventId;
	const events = useSelector((state) => state.events.events);
	return Filter.filterRadio(eventName, "name", events)[0];
};

export const getParticipants = async (ids) => {
	const participantList = [];
	await ids.map(async (id) => {
		const user = await readUserById(id);
		if (user) participantList.push({ ...user, key: id });
		return user;
	});
	return participantList;
};

export const addToInterested = async (event, user, dispatch) => {
	let action = "";
	if (!user.interestedEvents.includes(event.id)) {
		await updateUser(
			{ interestedEvents: arrayUnion(event.id) },
			user.id,
			dispatch
		);
		action = "union";
	} else {
		await updateUser(
			{ interestedEvents: arrayRemove(event.id) },
			user.id,
			dispatch
		);
		action = "remove";
	}
	dispatch(updateInterested({ event: event, action: action }));
	message.success(
		`${event.name} successfully ${
			action === "union" ? "added to" : "removed from"
		} your interested events.`
	);
};

export const addToRegistered = async (event, user, dispatch) => {
	let action = "";
	if (!user.registeredEvents.includes(event.id)) {
		await updateUser(
			{ registeredEvents: arrayUnion(event.id) },
			user.id,
			dispatch
		);
		await updateEvent({ registeredUsers: arrayUnion(user.id) }, event.id);
		action = "union";
	} else {
		await updateUser(
			{ registeredEvents: arrayRemove(event.id) },
			user.id,
			dispatch
		);
		await updateEvent({ registeredUsers: arrayRemove(user.id) }, event.id);
		action = "remove";
	}
	dispatch(updateRegistered({ event: event, action: action }));
	message.success(
		`${action === "union" ? "Registered to" : "Unregistered from"} ${
			event.name
		} successfully.`
	);
};

export const removeParticipant = async (eventId, userId, dispatch) => {
	await updateUser({ registeredEvents: arrayRemove(eventId) }, userId);
	await updateEvent({ registeredUsers: arrayRemove(userId) }, eventId);
};
