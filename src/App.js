import { NavBar } from "./components/NavBar";
import { Outlet } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readEvents } from "./services/crud/events";
import { SplashScreen } from "./splash";
import { signIn } from "./services/auth";
import firebase from "firebase/compat/app";
import {
	setCreatedEvents,
	setInterestedEvents,
	setRegisteredEvents,
} from "./redux/actions/eventActions";
import { UserRole } from "./services/crud/user";

function App() {
	const dispatch = useDispatch();
	const [loading1, setLoading1] = useState(true);
	const [loading2, setLoading2] = useState(true);
	const { currentUser } = useSelector((s) => s.users);
	const { events } = useSelector((s) => s.events);

	const getFilteredEvents = (allEvents, ids) => {
		return allEvents.filter((event) => ids.includes(event.id));
	};

	const getUsersEvents = useCallback(() => {
		if (currentUser.id && events.length > 0) {
			const interestedEvents = getFilteredEvents(
				events,
				currentUser.interestedEvents
			);
			const registeredEvents = getFilteredEvents(
				events,
				currentUser.registeredEvents
			);
			dispatch(setInterestedEvents(interestedEvents));
			dispatch(setRegisteredEvents(registeredEvents));
			if (currentUser.role === UserRole.ORGANIZATION) {
				const createdEvents = getFilteredEvents(
					events,
					currentUser.createdEvents
				);
				dispatch(setCreatedEvents(createdEvents));
			}
		}
	}, [currentUser, events, dispatch]);

	const getAuthObserver = useCallback(() => {
		const unregisterAuthObserver = firebase
			.auth()
			.onAuthStateChanged(async (user) => {
				if (user) {
					await signIn(user, dispatch);
				}
				setLoading1(false);
			});
		return { observer: unregisterAuthObserver };
	}, [dispatch]);

	const getAllEvents = useCallback(async () => {
		const allEvents = await readEvents(dispatch);
		setLoading2(false);
		return allEvents;
	}, [dispatch]);

	useEffect(() => {
		getAllEvents()
			.then((e) => console.log("Events received."))
			.catch(console.error);
		const { observer } = getAuthObserver();
		getUsersEvents();
		return () => observer();
	}, [getAuthObserver, getAllEvents, getUsersEvents, currentUser, events]);

	if (loading1 || loading2) return <SplashScreen />;
	return (
		<div className="App">
			<NavBar />
			<div className="content">
				<Outlet />
			</div>
		</div>
	);
}

export default App;
