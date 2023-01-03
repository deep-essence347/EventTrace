import { IoLocationOutline } from "@react-icons/all-files/io5/IoLocationOutline";
import DefaultCover from "../../app-images/DefaultCover.png";
import { DateTime } from "../../data/classes";
import { useNavigate } from "react-router-dom";

export const EventList = ({ event, index }) => {
	const navigate = useNavigate();
	const truncate = (string, n) => {
		return string.length > n ? string.substr(0, n - 1) + "..." : string;
	};

	const month = DateTime.toStringDate(event.dateTime.startDate)
		.split(", ")[0]
		.split(" ")[1];

	return (
		<div
			className="flex flex-row justify-start my-6 shadow-md w-auto items-start border-[0.2px] border-slate-100 cursor-pointer"
			onClick={() => navigate(`/e/${event.name}/about`)}
		>
			<div className="flex flex-row justify-between w-full">
				<div className="flex flex-col sm:flex-row w-full">
					<div className="lg:w-auto h-full">
						<img
							src={event.coverImage ? event.coverImage : DefaultCover}
							className="object-cover w-[12rem] lg:w-[14rem] h-full"
							alt={`${event.name}'s Cover`}
						/>
					</div>
					<div className="flex flex-col sm:pl-3 xl:pl-6 items-start justify-start my-2 w-full">
						<div className="text-[14px] lg:text-[17px] font-bold text-[#1A2B49FF]">
							{event.name}
						</div>
						<div className="hidden lg:block text-[11px] md:text-[12px] xl:text-[14px] font-medium text-[#183A75FF]">
							{truncate(event.description, 55)}
						</div>
						<div className="lg:hidden md:block hidden text-[12px] font-medium text-[#183A75FF]">
							{truncate(event.description, 45)}
						</div>
						<div className="flex flex-row text-[11px] md:text-[12px] lg:text-[14px] font-normal text-[#959CA9]">
							<IoLocationOutline className="self-center" />
							{event.type === "Physical" && (
								<div>{event.location.location}</div>
							)}
							{event.type === "Virtual" && <div>{event.eventLink}</div>}
						</div>
						<div className="flex flex-row justify-between w-full sm:pr-3 xl:pr-6">
							<div className="grid grid-cols-1">
								<div className="justify-self-start text-[11px] md:text-[12px] lg:text-[14px] font-normal text-[#959CA9]">
									{DateTime.toStringDate(event.dateTime.startDate)} -{" "}
									{DateTime.toStringDate(event.dateTime.endDate)}
								</div>
								<div className="flex overflow-auto pr-4 pb-3 pt-1">
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

							{/* <button className="block self-end">
								<div className="hidden border-2 border-[#575757] rounded-full font-bold h-auto items-end">
									<IoIosHeart className="self-center items-center font-bold text-[#575757] w-3 h-3 md:w-5 md:h-5 m-[3px]" />
								</div>
								<div className="border-2 border-[#575757] rounded-full font-bold h-auto items-end">
									<IoIosHeartEmpty className="self-center items-center font-bold text-[#575757] w-3 h-3 md:w-5 md:h-5 m-[3px]" />
								</div>
							</button> */}
						</div>
					</div>
				</div>
				<div className="sm:w-24 lg:w-28 xl:w-32 text-white text-3xl font-bold">
					{index % 2 === 0 && (
						<div className="flex flex-col bg-[#7B84A5] h-full items-center justify-center">
							{/* <div>{date(event.date)}</div>
							<div>{month(event.date)}</div> */}
							<div>
								{DateTime.toMomentDate(event.dateTime.startDate).date()}
							</div>
							<div>
								{/* {DateTime.toMomentDate(event.dateTime.startDate).month()} */}
								{month}
							</div>
						</div>
					)}
					{index % 2 !== 0 && (
						<div className="flex flex-col bg-[#A57B99] h-full items-center justify-center">
							<div>
								{DateTime.toMomentDate(event.dateTime.startDate).date()}
							</div>
							<div>
								{/* {DateTime.toMomentDate(event.dateTime.startDate).month()} */}
								{month}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
