import { BsEnvelope, BsTelephone, BsGlobe2 } from "react-icons/bs";
import { DateTime } from "./classes";
export const trimtext = ({ text, length = 380 }) => {
	return text.length > length ? `${text.slice(0, length)}...` : text;
};

export const checkContactLinks = (dataSet) => {
	const contactLinks = [];
	if (dataSet.email)
		contactLinks.push({
			value: dataSet.email,
			icon: <BsEnvelope className="w-6 h-6" />,
		});
	if (dataSet.phone)
		contactLinks.push({
			value: dataSet.phone,
			icon: <BsTelephone className="w-6 h-6" />,
		});
	if (dataSet.website)
		contactLinks.push({
			value: dataSet.website,
			icon: <BsGlobe2 className="w-6 h-6" />,
		});

	return contactLinks;
};

export const eventActionConditions = (loggedIn, currentUser, event) => {
	let state = { disabled: true, message: "" };
	if (!loggedIn) state.message = "Please login to perform this action.";
	else if (currentUser.id === event.creator.id)
		state.message = "You cannot perform this action.";
	else if (DateTime.isBetween(event.dateTime.startDate, event.dateTime.endDate))
		state.message = "This event is currently being conducted.";
	else if (DateTime.isBefore(event.dateTime.endDate))
		state.message = "This event has already been conducted.";
	else state.disabled = false;
	return state;
};

export const checkConductedEvent = (event) => {
	let state = { conducting: true, message: "" };
	if (DateTime.isBetween(event.dateTime.startDate, event.dateTime.endDate))
		state.message = "This event is currently being conducted.";
	else if (DateTime.isBefore(event.dateTime.endDate))
		state.message = "This event has already been conducted.";
	else state.conducting = false;
	return state;
};
