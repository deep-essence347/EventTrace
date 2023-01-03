import React, { useEffect, useState } from "react";
// import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import { EventCard } from "./eventcard";
// import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
	Affix,
	Checkbox,
	DatePicker,
	Form,
	Input,
	Modal,
	Radio,
	Select,
} from "antd";
import { MdSearch, MdKeyboardArrowRight } from "react-icons/md";
import { categories } from "../data/data";
import { DateTime, Filter } from "../data/classes";

/**
 * `type="h"` for horizontal list
 */
export const EventList = ({ title, to, icon, events, type }) => {
	return (
		<section className="py-4">
			<div className="flex justify-between lg:mx-20 md:mx-10 mx-6  items-center">
				<h2>{title}</h2>
				<Link
					to={to}
					className="text-blue-500 font-medium text-sm underline underline-offset-2 hover:font-semibold hover:text-primary ease-out-transition"
				>
					See More
				</Link>
			</div>
			{events && events.length > 0 ? (
				<div>
					{type === "h" ? (
						<OneRowList events={events.slice(0, 8)} />
					) : (
						<MultipleRowList events={events} />
					)}
				</div>
			) : (
				<p className="text-center text-lg font-medium py-5">
					No Events to display
				</p>
			)}
		</section>
	);
};

const OneRowList = ({ events }) => {
	return (
		<ScrollMenu
			// LeftArrow={LeftArrow}
			// RightArrow={RightArrow}
			wrapperClassName="h-full lg:px-8 md:px-4"
			scrollContainerClassName="lg:pl-12 pl-6 pr-4"
		>
			{Filter.sortByDate(["dateTime", "startDate"], events).map((event) => (
				<EventCard event={event} key={event.name} />
			))}
		</ScrollMenu>
	);
};

const MultipleRowList = ({ events }) => {
	const [fbVisible, setFBVisible] = useState(false);
	const [categoryModalVisible, setCategoryModalVisible] = useState(false);
	const [selectedCategories, setCategories] = useState([]);
	const [displayEvents, setDisplayEvents] = useState(events);
	const [csb, setCSB] = useState("createdDate");

	useEffect(() => {
		setDisplayEvents(Filter.sortByDate(["createdAt"], displayEvents));
	}, [displayEvents]);

	const filterEvents = (filterOptions) => {
		let filteredEvents = events.slice();
		if (filterOptions.name)
			filteredEvents = Filter.filterText(
				filterOptions.name,
				"name",
				filteredEvents
			);
		if (filterOptions.type !== "Both")
			filteredEvents = Filter.filterRadio(
				filterOptions.type,
				"type",
				filteredEvents
			);
		if (selectedCategories.length > 0)
			filteredEvents = Filter.filterArray(
				selectedCategories,
				"categories",
				filteredEvents
			);
		if (filterOptions.dates && filterOptions.dates.length === 2)
			filteredEvents = Filter.filterDate(
				filterOptions.dates,
				["dateTime", "startDate"],
				filteredEvents
			);
		if (filterOptions.sort !== csb) {
			switch (filterOptions.sort) {
				case "name":
					filteredEvents = Filter.sortByString("name", filteredEvents);
					break;
				case "eventDate":
					filteredEvents = Filter.sortByDate(
						["dateTime", "startDate"],
						filteredEvents
					);
					break;
				case "createdDate":
					filteredEvents = Filter.sortByDate(["createdAt"], filteredEvents);
					break;

				default:
					break;
			}
			setCSB(filterOptions.sort);
		}
		setDisplayEvents(filteredEvents);
	};

	return (
		<div className="relative">
			<div className="absolute right-0 top-10 z-10">
				<Affix offsetTop={80}>
					{!fbVisible && (
						<div
							className="bg-primary text-white shadow-xl cursor-pointer p-2 rounded-l-md"
							onClick={() => setFBVisible(true)}
						>
							<MdSearch className="w-8 h-8" />
						</div>
					)}
					{fbVisible && (
						<div className="w-64 h-30 bg-gray-100 shadow-xl rounded-l-md border">
							<div className="flex h-10 border-b-2 text-lg font-semibold items-center">
								<span
									className="px-2 border-r-2 bg-gray-300 h-full py-1.5 mr-2 cursor-pointer"
									onClick={() => setFBVisible(false)}
								>
									<MdKeyboardArrowRight className="w-6 h-6" />
								</span>
								Filter
							</div>
							<div className="p-3">
								<Form
									name="filterForm"
									// labelCol={{ span: 0 }}
									initialValues={{
										type: "Both",
										sort: csb,
									}}
									onFinish={(options) => filterEvents(options)}
								>
									<Form.Item name="name">
										<Input
											className="rounded border-gray-400 h-10"
											placeholder="Search By Name"
										/>
									</Form.Item>
									<Form.Item name="type">
										<Radio.Group buttonStyle="solid" className="rounded">
											<Radio.Button value="Physical">Physical</Radio.Button>
											<Radio.Button value="Virtual">Virtual</Radio.Button>
											<Radio.Button value="Both">Both</Radio.Button>
										</Radio.Group>
									</Form.Item>
									<Form.Item name={"categories"}>
										<button
											className="border-2 rounded border-gray-400 px-3 h-10 text-base font-semibold"
											onClick={() => setCategoryModalVisible(true)}
											type={undefined}
										>
											Categories
										</button>
										{selectedCategories.length > 0 && (
											<div className="flex flex-wrap gap-x-2 gap-y-1 py-2">
												{selectedCategories.map((category) => (
													<div className="rounded-full bg-green-400 px-3 py-1 font-semibold text-white">
														{category}
													</div>
												))}
											</div>
										)}
										<Modal
											title="Select Your Categories"
											visible={categoryModalVisible}
											centered
											onOk={() => setCategoryModalVisible(false)}
											onCancel={() => setCategoryModalVisible(false)}
											okText={
												<span className="text-primary text-semibold hover:text-white">
													Done
												</span>
											}
										>
											<Checkbox.Group
												options={categories}
												defaultValue={selectedCategories}
												onChange={(v) => setCategories(v.sort())}
											/>
										</Modal>
									</Form.Item>
									<Form.Item name={"dates"}>
										<DatePicker.RangePicker
											className="h-10"
											disabledDate={DateTime.disabledDate}
										/>
									</Form.Item>
									<Form.Item label="Sort By:" name={"sort"}>
										<Select
											className="h-10 font-semibold"
											// onChange={(val) => setType(val)}
										>
											<Select.Option value="name">Name</Select.Option>
											<Select.Option value="eventDate">
												Event Date
											</Select.Option>
											<Select.Option value="createdDate">
												Created Date
											</Select.Option>
										</Select>
									</Form.Item>
									<button type="submit" className="outlined-primary-btn py-1.5">
										Filter
									</button>
									<button
										type="reset"
										className="border-2 border-gray-400 px-3 py-1 rounded-full text-gray-500 ml-3 font-medium"
										onClick={() => {
											setDisplayEvents(events);
											setCategories([]);
										}}
									>
										Clear
									</button>
								</Form>
							</div>
						</div>
					)}
				</Affix>
			</div>
			<div className="flex flex-wrap justify-start lg:pl-20 md:pl-10 pl-6 gap-x-10 gap-y-5">
				{displayEvents.map((event) => (
					<EventCard event={event} key={event.name} />
				))}
			</div>
		</div>
	);
};

// function Arrow({ disabled, onClick, arrow }) {
// 	console.log(disabled, arrow);
// 	return (
// 		<div
// 			className={`hidden ${
// 				arrow === "r" ? "lg:right-14 right-4" : "lg:left-14 left-4"
// 			} md:flex rounded-full shadow-md bg-secondary cursor-pointer`}
// 			disabled={disabled}
// 			onClick={onClick}
// 		>
// 			{arrow === "l" && <FaArrowAltCircleLeft className="w-10 h-10" />}
// 			{arrow === "r" && <FaArrowAltCircleRight className="w-10 h-10" />}
// 		</div>
// 	);
// }

// function LeftArrow() {
// 	const {
// 		isFirstItemVisible,
// 		scrollPrev,
// 		visibleItemsWithoutSeparators,
// 		initComplete,
// 	} = React.useContext(VisibilityContext);

// 	const [disabled, setDisabled] = React.useState(
// 		!initComplete || (initComplete && isFirstItemVisible)
// 	);
// 	React.useEffect(() => {
// 		if (visibleItemsWithoutSeparators.length) {
// 			setDisabled(isFirstItemVisible);
// 		}
// 	}, [isFirstItemVisible, visibleItemsWithoutSeparators]);

// 	return (
// 		<Arrow disabled={disabled} onClick={() => scrollPrev()} arrow={"l"}></Arrow>
// 	);
// }

// function RightArrow() {
// 	const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
// 		React.useContext(VisibilityContext);

// 	const [disabled, setDisabled] = React.useState(
// 		!visibleItemsWithoutSeparators.length && isLastItemVisible
// 	);
// 	React.useEffect(() => {
// 		if (visibleItemsWithoutSeparators.length) {
// 			setDisabled(isLastItemVisible);
// 		}
// 	}, [isLastItemVisible, visibleItemsWithoutSeparators]);

// 	return (
// 		<Arrow disabled={disabled} onClick={() => scrollNext()} arrow={"r"}>
// 			Right
// 		</Arrow>
// 	);
// }
