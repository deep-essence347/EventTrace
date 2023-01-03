import { EventList } from "./EventList";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Filter } from "../../data/classes";

export const UserEvents = () => {
	let [filteredEvents, setEvents] = useState([]);
	let [title, setTitle] = useState("");
	const category = useParams().category;
	const { createdEvents, interestedEvents, registeredEvents } = useSelector(
		(state) => state.events
	);

	useEffect(() => {
		switch (category) {
			case "interested":
				setEvents(interestedEvents);
				setTitle("Interested");
				break;
			case "registered":
				setEvents(registeredEvents);
				setTitle("Registered");
				break;
			case "created":
				setEvents(createdEvents);
				setTitle("Created");
				break;
			default:
				break;
		}
	}, [interestedEvents, registeredEvents, createdEvents, category]);

	return (
		<div className="mx-28 min-h-[90vh]">
			<h2>{title} Events</h2>
			{filteredEvents.length === 0 && (
				<p className="text-center text-lg font-medium py-5">
					No Events to display
				</p>
			)}
			{filteredEvents.length > 0 && (
				<div>
					{Filter.sortByDate(["dateTime", "startDate"], filteredEvents).map(
						(event, index) => {
							return <EventList event={event} key={event.id} index={index} />;
						}
					)}
				</div>
			)}
		</div>
	);
};
