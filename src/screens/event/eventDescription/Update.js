import React, { useState } from "react";
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
import { categories } from "../../../data/data";
import { DateTime } from "../../../data/classes";
import { updateEventDetails } from "../../../services/crud/events";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetEvent } from "./eventFunctions";

export const Update = () => {
	const event = useGetEvent();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const rules = { required: true, message: "Invalid Detail." };
	const [loading, setLoading] = useState(false);
	const [type, setType] = useState(event.type);
	const [selectedCategories, setCategories] = useState(event.categories);
	const [categoryModalVisible, setCategoryModalVisible] = useState(false);
	const { currentUser } = useSelector((state) => state.users);
	const disabled =
		DateTime.isBefore(event.dateTime.startDate) ||
		currentUser.id !== event.creator.id;

	const saveEvent = async (e) => {
		setLoading(true);
		const updatedEvent = {
			name: e.name,
			type: e.type,
			description: e.description,
			categories: selectedCategories,
			location: e.type === "Physical" ? { location: e.location } : null,
			participantLimit: e.participantLimit ? e.participantLimit : null,
			fee: e.fee,
			eventLink: e.type === "Virtual" ? e.eventLink : null,
			dateTime: {
				startDate: DateTime.timestampDate(e.dates[0]),
				endDate: DateTime.timestampDate(e.dates[1]),
				startTime: DateTime.toStringTime(e.times[0]),
				endTime: DateTime.toStringTime(e.times[1]),
			},
		};
		if (!disabled) {
			await updateEventDetails(updatedEvent, event.id, dispatch);
			navigate(`/e/${e.name}/about`);
			message.success("Event Successfully updated.");
			setLoading(false);
		} else message.error("You cannot update this event.");
	};
	return (
		<div className="md:w-4/6 w-9/12 mx-auto">
			<Form
				name="createEvent"
				layout="vertical"
				autoComplete="off"
				initialValues={{
					name: event.name,
					type: event.type,
					description: event.description,
					location: event.location ? event.location.location : null,
					categories: selectedCategories,
					eventLink: event.eventLink ? event.eventLink : null,
					fee: event.fee ? event.fee : null,
					participantLimit: event.participantLimit
						? event.participantLimit
						: null,
					dates: [
						DateTime.toMomentDate(event.dateTime.startDate),
						DateTime.toMomentDate(event.dateTime.endDate),
					],
					times: [
						DateTime.toMomentTime(event.dateTime.startTime),
						DateTime.toMomentTime(event.dateTime.endTime),
					],
				}}
				onFinish={(e) => saveEvent(e)}
			>
				<h2 className="mb-6 px-3">Update {event.name}</h2>
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
				<div className="flex flex-wrap">
					<div className="w-full sm:w-2/3 px-3">
						<Form.Item label="Categories" name={"categories"} rules={[rules]}>
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
					<div className="w-full sm:w-1/3 px-3">
						<Form.Item label="Event Fee" name={"fee"}>
							<InputNumber className="form-input" placeholder="Event Fee" />
						</Form.Item>
					</div>
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
				<div className="flex p-4">
					<button
						className="filled-primary-btn justify-content-center m-auto py-3"
						disabled={loading || disabled}
						type="submit"
					>
						{loading ? "Saving" : "Save Event"}
					</button>
				</div>{" "}
			</Form>
		</div>
	);
};
