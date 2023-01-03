import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./screens/home";
import { CreateEvent } from "./screens/event/CreateEvent";
import { EventDescription } from "./screens/event/eventDescription/EventDescription";
import { OrganizerDescription } from "./screens/Organizer/Organizerdash";
import { HomeScreen } from "./screens/event/HomeScreen";
import Userdashboard from "./screens/user/UserDashboard";
import { About } from "./screens/event/eventDescription/About";
import { Organizer } from "./screens/event/eventDescription/Organizer";
import { Participants } from "./screens/event/eventDescription/Participants";
import { Update } from "./screens/event/eventDescription/Update";
import App from "./App";
import { AdminOverview } from "./screens/admin/overview";
import { EditProfile } from "./screens/user/editProfile";
import { UserProfile } from "./screens/user/UserProfile";
import { UserEvents } from "./screens/user/UserEvents";

export const EventTraceRouter = () => {
	// const { loggedIn, currentUser } = useSelector((state) => state.users);
	// console.log(loggedIn, currentUser);
	return (
		<BrowserRouter>
			<Routes>
				{/* <UserRoutes /> */}
				<Route path="/" element={<App />}>
					{/* <Route path="/redirect" element={<Redirect />} /> */}
					<Route index element={<Navigate to="home" />} />
					{/* INDEX */}
					{/* USER */}
					<Route path="home" element={<Home />} />
					<Route path="u/home" element={<HomeScreen />} />
					<Route path="u/0" element={<Userdashboard />}>
						<Route index element={<Navigate to={"profile"} />} />
						<Route path="profile" element={<UserProfile />} />
						<Route path="edit-profile" element={<EditProfile />} />
						<Route path="e/:category" element={<UserEvents />} />
					</Route>
					{/* EVENTS */}
					<Route path="e" element={<Home />} />
					<Route path="e/create" element={<CreateEvent />} />
					<Route path="e/:eventId" element={<EventDescription />}>
						<Route index element={<Navigate to={"about"} />} />
						<Route path="about" element={<About />} />
						<Route path="organizer" element={<Organizer />} />
						<Route path="participants" element={<Participants />} />
						<Route path="update" element={<Update />} />
					</Route>

					{/* ORGANIZER */}
					<Route path="o/:id" element={<OrganizerDescription />} />
				</Route>
				<Route path="admin" element={<AdminOverview />}></Route>
			</Routes>
		</BrowserRouter>
	);
};
