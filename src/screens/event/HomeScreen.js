import React from "react";
import { EventList } from "../../components/eventList";
import { useSelector } from "react-redux";
import { Filter } from "../../data/classes";
import { getFutureEvents } from "../../redux/reducers/eventReducer";

export const HomeScreen = () => {
	const { loggedIn } = useSelector((state) => state.users);
	const { registeredEvents, interestedEvents } = useSelector(
		(state) => state.events
	);
	const events = useSelector(getFutureEvents);
	const upcoming = Filter.sortByDate(["dateTime", "startDate"], events.slice());
	// const newlyCreated = Filter.sortByDate(["createdAt"], events.slice());
	return (
		<div className="h-full">
			{loggedIn && (
				<EventList
					title={"Interested Events"}
					to="/"
					events={interestedEvents}
					type="h"
				/>
			)}
			{loggedIn && (
				<EventList
					title={"Registered Events"}
					to="/"
					events={registeredEvents}
					type="h"
				/>
			)}
			<EventList title={"Upcoming Events"} to="/" events={upcoming} type="h" />
			{/* <EventList
				title={"Newly Created"}
				to="/"
				events={newlyCreated}
				type="h"
			/> */}
			<EventList title={"All Events"} to="/" events={events} />
		</div>
	);
};
