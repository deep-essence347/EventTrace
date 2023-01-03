import React, { useCallback, useEffect, useState } from "react";
import { Container } from "../../../components/container";
import { IconedInfoList } from "../../../components/IconedInfoList";
import { checkContactLinks } from "../../../data/functions";
// import { ConnectIcons } from "../../../components/connectIcons";
import { TrimmedText } from "../../../components/trimmedText";
import { useGetEvent } from "./eventFunctions";
import { SplashScreen } from "../../../splash";
import { Avatar } from "antd";
import { readUserById } from "../../../services/crud/user";
export const Organizer = () => {
	const [organizer, setOrganizer] = useState(null);
	const event = useGetEvent();

	const getOrganizer = useCallback(async (id) => {
		const data = await readUserById(id);
		setOrganizer(data);
	}, []);

	useEffect(() => {
		getOrganizer(event.creator.id).catch(console.error);
	}, [getOrganizer, event]);

	if (!organizer) return <SplashScreen />;

	const contactLinks = checkContactLinks(organizer);
	return (
		<div className="md:w-4/6 w-9/12 mx-auto">
			<div className="md:grid md:grid-cols-5 gap-10">
				<div className="md:block col-span-2 order-last w-fit mx-auto items-center">
					<Avatar
						className="w-40 h-40"
						src={
							<img
								src={organizer.profileImage}
								alt={organizer.name + "'s Profile Picture"}
								className="object-cover"
							/>
						}
					/>
					<div className="xs:block hidden text-left md:ml-0 ml-4">
						{/* <ConnectIcons connectLinks={organizer.connect} /> */}
					</div>
				</div>
				<div className="col-span-3">
					<Container>
						<div className="text-left">
							<h2>{organizer.name}</h2>
							<div className="text-grey font-normal pt-2 pb-5">
								<TrimmedText text={organizer.bio} />
							</div>
							<IconedInfoList list={contactLinks} />
						</div>
					</Container>
				</div>
			</div>
			<div className="block xs:hidden text-left mt-4">
				{/* <ConnectIcons connectLinks={organizer.connect} /> */}
			</div>
		</div>
	);
};
