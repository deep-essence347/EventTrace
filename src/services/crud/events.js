import { message } from "antd";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
	doc,
	arrayUnion,
	query,
	where,
	getDoc,
} from "firebase/firestore";
import {
	allEvents,
	createEvent as create,
	removeEvent,
	updateEvent as update,
} from "../../redux/actions/eventActions";
import { db } from "../firebase";

const eventsCollectionRef = collection(db, "events");

export const readEvents = async (dispatch) => {
	try {
		const data = await getDocs(eventsCollectionRef);
		const events = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
		dispatch(allEvents(events));
		return events;
	} catch (e) {
		console.log(e);
	}
};

export const readEventByName = async (name) => {
	let event = null;
	const events = await getDocs(
		query(eventsCollectionRef, where("name", "==", name))
	);
	events.forEach((doc) => {
		event = { ...doc.data(), id: doc.id };
	});
	return event;
};

export const createEvent = async (event, dispatch) => {
	try {
		const existingEvent = await readEventByName(event.name);
		if (existingEvent) {
			message.error(`Event with name ${event.name} already exists.`);
			return;
		}
		const userRef = doc(db, "users", event.creator.id);
		const createdEvent = await addDoc(eventsCollectionRef, event);
		await updateDoc(userRef, { createdEvents: arrayUnion(createdEvent.id) });
		dispatch(create({ ...event, id: createdEvent.id }));
	} catch (e) {
		console.log(e);
		message.error(e);
	}
};

export const updateEventDetails = async (data, id, dispatch) => {
	try {
		const existingEvent = await readEventByName(data.name);
		if (existingEvent && existingEvent.id !== id) {
			message.error(`Event with name ${data.name} already exists.`);
			return;
		}
		const document = doc(db, "events", id);
		await updateDoc(document, data);
		const updatedDoc = await getDoc(document);
		dispatch(update({ ...updatedDoc.data(), id: updatedDoc.id }));
	} catch (error) {
		console.log(error);
		// message.error(error);
	}
};

export const updateEvent = async (data, id) => {
	try {
		const document = doc(db, "events", id);
		await updateDoc(document, data);
		// return await getDoc(document);
	} catch (e) {
		console.log(e);
	}
};

export const deleteEvent = async (id, dispatch) => {
	try {
		const eventDoc = doc(db, "events", id);
		await deleteDoc(eventDoc);
		dispatch(removeEvent(id));
	} catch (e) {
		console.log(e);
	}
};
