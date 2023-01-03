import React, { useEffect, useState } from "react";
import EventImage from "../../app-images/event1.png";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../../data/data";
import {
	Form,
	Input,
	InputNumber,
	Select,
	Modal,
	Checkbox,
	DatePicker,
	TimePicker,
	message,
} from "antd";
import { DateTime } from "../../data/classes";
import { createEvent } from "../../services/crud/events";
import { useNavigate } from "react-router-dom";

export const CreateEvent = () => {
	const caption = "Create Your Own Event";
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const { loggedIn, currentUser } = useSelector((state) => state.users);

	const rules = { required: true, message: "Invalid Detail." };

	const [selectedCategories, setCategories] = useState([]);
	const [type, setType] = useState("Physical");
	const [categoryModalVisible, setCategoryModalVisible] = useState(false);

	const createEventWarning = () => {
		let warn = false;
		if (!loggedIn) {
			warn = true;
			message.warning("Please login to create an event.");
		}
		if (currentUser.role === "user") {
			warn = true;
			message.warning(
				"Please verify your account as an organizer to create an event"
			);
		}
		return warn;
	};

	useEffect(() => createEventWarning());

	const saveEvent = async (e) => {
		setLoading(true);
		const newEvent = {
			name: e.name,
			type: e.type,
			description: e.description,
			categories: selectedCategories,
			coverImage: null,
			fee: null,
			location: {
				location: e.type === "Physical" ? e.location : null,
				latitude: null,
				longitude: null,
			},
			participantLimit: e.participantLimit ? e.participantLimit : null,
			eventLink: e.type === "Virtual" ? e.eventLink : null,
			publish: true,
			dateTime: {
				startDate: DateTime.timestampDate(e.dates[0]),
				endDate: DateTime.timestampDate(e.dates[1]),
				startTime: DateTime.toStringTime(e.times[0]),
				endTime: DateTime.toStringTime(e.times[1]),
			},
			createdAt: DateTime.today({ inTimestamp: true }),
			creator: {
				id: currentUser.id,
				role: currentUser.role,
			},
			registeredUsers: [],
		};
		if (!createEventWarning()) {
			await createEvent(newEvent, dispatch);
			message.success("Event Successfully created.");
			navigate(`/e/${newEvent.name}/about`);
		}
		setLoading(false);
	};

	return (
		<div className="lg:grid lg:grid-cols-2 w-full p-8">
			<div className="lg:w-full lg:h-full hidden lg:flex px-6 order-last">
				<div className="my-auto">
					<img src={EventImage} alt={caption} className="w-[95%] mx-auto" />
					<h3 className="text-3xl font-bold text-center text-primary pt-5">
						{caption}
					</h3>
				</div>
			</div>
			{/*TODO: Add Condition
				1. If the current user is not an organization.
				2. If the current user is an organization but has not been verified. */}
			<Form
				name="createEvent"
				layout="vertical"
				autoComplete="off"
				initialValues={{ type: "Physical" }}
				onFinish={(e) => saveEvent(e)}
			>
				<h2 className="mb-6 px-3">Create an Event</h2>
				<div className="flex flex-wrap">
					<div className="w-full sm:w-1/2 px-3">
						<Form.Item label="Name" name={"name"} rules={[rules]}>
							<Input className="form-input" placeholder="Full Name" />
						</Form.Item>
					</div>
					<div className="w-full sm:w-1/2 px-3">
						<Form.Item label="Type" name={"type"} rules={[rules]}>
							<Select
								className="form-input py-2"
								bordered={false}
								onChange={(val) => setType(val)}
							>
								<Select.Option value="Physical">Physical</Select.Option>
								<Select.Option value="Virtual">Virtual</Select.Option>
							</Select>
						</Form.Item>
					</div>
				</div>
				<div className="w-full px-3">
					<Form.Item label="Description" name={"description"} rules={[rules]}>
						<Input.TextArea
							rows={4}
							className="form-input"
							placeholder="About Your Event"
						/>
					</Form.Item>
				</div>
				<div className="w-full px-3">
					<Form.Item label="Categories" name={"categories"}>
						<div
							className="form-input"
							onClick={() => setCategoryModalVisible(true)}
						>
							<input
								className="w-full bg-transparent border-none h-full cursor-pointer"
								placeholder="Select Your Categories"
								name="categories"
								value={selectedCategories.join(", ")}
								disabled
							></input>
						</div>
					</Form.Item>
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
				</div>
				<div className="flex flex-wrap">
					<div className="w-full sm:w-2/3 px-3">
						{type === "Physical" ? (
							<Form.Item label="Location" name={"location"} rules={[rules]}>
								<Input className="form-input" placeholder="Location" />
							</Form.Item>
						) : (
							<Form.Item label="Event Link" name={"eventLink"} rules={[rules]}>
								<Input className="form-input" placeholder="Event Link" />
							</Form.Item>
						)}
					</div>
					<div className="w-full sm:w-1/3 px-3">
						<Form.Item label="Participation Limit" name={"participantLimit"}>
							<InputNumber
								className="form-input"
								placeholder="Participation Limit"
							/>
						</Form.Item>
					</div>
				</div>
				<div className="flex flex-wrap">
					<div className="w-full sm:w-1/2 px-3">
						<Form.Item label="Date" name={"dates"} rules={[rules]}>
							<DatePicker.RangePicker
								className="form-input"
								disabledDate={DateTime.disabledDate}
								renderExtraFooter={() => (
									<em>**Select same dates if it is a one day event.</em>
								)}
							/>
						</Form.Item>
					</div>
					<div className="w-full sm:w-1/2 px-3">
						<Form.Item label="Time" name={"times"} rules={[rules]}>
							<TimePicker.RangePicker format="HH:mm" className="form-input" />
						</Form.Item>
					</div>
				</div>
				{/* <p className="text-center text-red-600 italic">
					***This event will be sent for review before publishing. <br />
					It may take upto 48 hours.***
				</p> */}
				<div className="flex p-4">
					<button
						className="filled-primary-btn justify-content-center m-auto py-3"
						disabled={loading}
						type="submit"
					>
						{loading ? "Creating" : "Create Event"}
					</button>
					{/* <Button
						type="primary"
						className="filled-primary-btn m-auto py-2"
						disabled={loading}
						htmlType={"submit"}
					>
						{loading ? "Creating" : "Create Event"}
					</Button> */}
				</div>{" "}
			</Form>
		</div>
	);
};
