import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { Badge } from "./Badge";
import DefaultCover from "../app-images/DefaultCover.png";
import { DateTime } from "../data/classes";
import { eventActionConditions } from "../data/functions";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { addToInterested } from "../screens/event/eventDescription/eventFunctions";

export const EventCard = ({ event }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { loggedIn, currentUser } = useSelector((state) => state.users);

	const actionDisabled = eventActionConditions(loggedIn, currentUser, event);
	const [interested, setInterested] = useState(
		currentUser.id ? currentUser.interestedEvents.includes(event.id) : false
	);

	const toggleInterested = async () => {
		if (actionDisabled.disabled) message.error(actionDisabled.message);
		else await addToInterested(event, currentUser, dispatch);
		setInterested(!interested);
	};

	const days = DateTime.difference(
		event.dateTime.startDate,
		event.dateTime.endDate
	);
	return (
		<div className="shadow-lg w-[320px] rounded-sm overflow-hidden md:mr-8 mr-5 my-5 shrink hover:shadow-2xl ease-out-transition">
			<div className="relative w-full">
				<img
					src={event.coverImage ?? DefaultCover}
					alt={event.name + "'s Cover Image"}
					className="w-full h-52 object-cover cursor-pointer"
					onClick={() => navigate(`/e/${event.name}/about`)}
				/>
				<Badge text={`${days} ${days > 1 ? "days" : "day"}`} />

				{event.type === "Virtual" && (
					<Badge
						text="virtual"
						bgColor="bg-green-700"
						position="top-5 left-5"
					/>
				)}
				{!actionDisabled.disabled && (
					<div
						className="absolute rounded-full w-10 h-10 flex items-center justify-center bg-white shadow-md text-primary -bottom-5 right-5 z-1 cursor-pointer"
						onClick={() => toggleInterested()}
					>
						{!interested && <BsBookmark className="w-5 h-5" />}
						{interested && <BsBookmarkFill className="w-5 h-5" />}
					</div>
				)}
			</div>
			<div className="px-4 py-2">
				<div className="text-left">
					<h3
						className="cursor-pointer truncate"
						onClick={() => navigate(`/e/${event.name}/about`)}
					>
						{event.name}
					</h3>
					<p className="truncate">
						{DateTime.toStringDate(event.dateTime.startDate)} -{" "}
						{DateTime.toStringDate(event.dateTime.endDate)}
					</p>
					<p className="truncate">
						{event.type === "Physical"
							? event.location.location
							: event.eventLink}
					</p>
				</div>
			</div>
			<div className="flex overflow-hidden px-4 pb-4 pt-1">
				{event.categories.slice(0, 3).map((category) => {
					return (
						<div
							className="w-fit snap-start bg-secondary text-primary rounded-full py-1 px-3 text-sm font-semibold mr-2 hover:cursor-default"
							key={category}
						>
							{category}
						</div>
					);
				})}
			</div>
		</div>
	);
};
