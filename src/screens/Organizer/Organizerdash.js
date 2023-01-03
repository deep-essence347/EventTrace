import { IconedInfoList } from "../../components/IconedInfoList";
import { fakeEventList, fake_organizer } from "../../data/fakeDB";
import { checkContactLinks } from "../../data/functions";
import { ConnectIcons } from "../../components/connectIcons";
import { TrimmedText } from "../../components/trimmedText";
import { Overview } from "../../components/overview";
import { BsClipboardCheck } from "react-icons/bs";
import { MdOutlineEventNote } from "react-icons/md";
import { EventList } from "../../components/eventList";

export const OrganizerDescription = () => {
	const organizer = fake_organizer;
	const events = fakeEventList.slice(10, 15);
	const contactLinks = checkContactLinks(organizer);
	const overviewData = [
		{
			count: 4,
			title: "Organized Events",
			icon: <MdOutlineEventNote className="overview-icon" />,
		},
		{
			count: 302,
			title: "Total Participants",
			icon: <BsClipboardCheck className="overview-icon" />,
		},
	];

	return (
		<div className="relative">
			<div className="w-10/12 mx-auto">
				<div className="md:grid grid-cols-5 lg:gap-0 gap-10 rounded-xl lg:mx-16 ">
					<div className="col-span-2 mx-auto">
						<div className="rounded-full w-40 aspect-square bg-secondary md:my-8 my-3 mx-auto mb-4">
							<img
								src={organizer.profileImage}
								alt={organizer.name + "'s Profile Picture"}
							/>
						</div>
						<div className="md:block flex justify-between items-center">
							<div className="xs:mx-0 mx-auto">
								<IconedInfoList list={contactLinks} />
							</div>
							<div className="xs:block hidden text-left md:mt-8">
								<ConnectIcons connectLinks={organizer.connect} />
							</div>
						</div>
					</div>
					<div className="col-span-3 pt-6 md:p-8 text-center md:text-left space-y-4">
						<div className="col-span-3">
							<div className="text-left">
								<h2>{organizer.name}</h2>

								<div className="text-grey font-normal pt-4">
									<TrimmedText text={organizer.description} />
								</div>
							</div>
							<Overview
								dataList={overviewData}
								className="lg:block hidden mt-3"
							/>
						</div>
					</div>
				</div>
				<Overview dataList={overviewData} className="block lg:hidden mt-5" />
				<div className="block xs:hidden text-left mt-4">
					<ConnectIcons connectLinks={organizer.connect} />
				</div>

				{/* <div class="flex mx-3 mt-64 ml-2 mr-82">
					<Cards />
				</div> */}
			</div>
			<EventList
				to={"/"}
				title={`Events from ${organizer.name}`}
				type="h"
				events={events}
			/>
			<div className="fixed top-0 bg-gradient-to-b from-secondary to-transparent h-[36vh] w-full -z-10"></div>
		</div>
	);
};
