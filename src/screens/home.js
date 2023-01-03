import React from "react";
import { EventList } from "../components/eventList";
import HomePageImage from "../app-images/HomePage.jpg";
import { useSelector } from "react-redux";
import { getFutureEvents } from "../redux/reducers/eventReducer";
export const Home = () => {
	const eventList = useSelector(getFutureEvents);
	return (
		<div className="w-full">
			<div className="relative w-full lg:h-[36rem] md:h-[32rem] h-[24rem]">
				<div className="absolute flex bottom-24 w-full px-20 justify-between items-center">
					<h2 className="lg:text-5xl md:text-3xl text-xl text-white leading-relaxed">
						Don't miss any events with
						<br />
						<span className="pt-5 lg:text-6xl md:text-4xl text-3xl font-extrabold uppercase">
							EventTrace
						</span>
					</h2>
					<a
						className="md:px-6 px-4 py-4 sm:block hidden border-[3px] h-fit text-lg font-semibold text-white lg:mx-20 md:mx-10 text-center rounded-lg"
						href="#new_events"
					>
						See New Events
					</a>
				</div>
				<img
					src={HomePageImage}
					alt=""
					className="w-full object-cover h-full"
				/>
			</div>
			<div id="new_events">
				<EventList title={"New Events"} to={"/"} events={eventList} />
			</div>
		</div>
	);
};
