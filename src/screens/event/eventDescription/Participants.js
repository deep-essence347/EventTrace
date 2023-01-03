import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import { TableFilter } from "../../../data/tableFilter";
import { Container } from "../../../components/container";
import { readUserById } from "../../../services/crud/user";
import { useGetEvent } from "./eventFunctions";

export const Participants = () => {
	const event = useGetEvent();
	const [participants, setParticipants] = useState([]);
	const requestParticipants = useCallback(async (ids) => {
		const list = [];
		await Promise.all(
			ids.map(async (id) => {
				const user = await readUserById(id);
				if (user) list.push({ ...user, key: id });
				return user;
			})
		);
		setParticipants(list);
	}, []);

	useEffect(() => {
		requestParticipants(event.registeredUsers).catch(console.error);
	}, [requestParticipants, event]);

	return <ParticipantsList participants={participants} />;
};

class ParticipantsList extends TableFilter {
	handleChange = (filters, sorter) => {
		this.setState({
			filteredInfo: filters,
			sortedInfo: sorter,
		});
	};

	render() {
		let { sortedInfo, filteredInfo } = this.state;
		sortedInfo = sortedInfo || {};
		filteredInfo = filteredInfo || {};

		// const showDeleteConfirm = (user) => {
		// 	Modal.confirm({
		// 		title: "Are you sure remove this user's registration?",
		// 		icon: (
		// 			<BsExclamationTriangle className="w-8 h-8 text-yellow-400 pb-2 mx-auto" />
		// 		),
		// 		centered: true,
		// 		content: "You will not be able to undo this action.",
		// 		okText: "Yes",
		// 		okType: "danger",
		// 		cancelText: "No",
		// 		async onOk() {
		// 			console.log(this.props);
		// 			await this.handleRemove(user);
		// 		},
		// 		onCancel() {
		// 			console.log("Cancel");
		// 		},
		// 	});
		// };

		const columns = [
			{
				title: "Name",
				dataIndex: "name",
				key: "name",
				ellipsis: true,
				sorter: (a, b) => a.name.localeCompare(b.name),
				// ...this.getColumnSearchProps("name"),
			},
			{
				title: "Email",
				dataIndex: "email",
				key: "email",
				ellipsis: true,
				sorter: (a, b) => a.name.localeCompare(b.name),
				// ...this.getColumnSearchProps("email"),
			},
			{
				title: "Phone",
				dataIndex: "phone",
				key: "phone",
				ellipsis: true,
				render: (value) => (value ? value : "---"),
			},
			{
				title: "Gender",
				dataIndex: "gender",
				key: "gender",
				ellipsis: true,
				// filters: [
				// 	{ text: "Male", value: "Male" },
				// 	{ text: "Female", value: "Female" },
				// ],
				// filteredValue: filteredInfo.gender || null,
				// onFilter: (value, record) =>
				// 	record.gender ? record.gender.indexOf(value) === 0 : null,
				render: (value) => (value ? value : "---"),
			},
			{
				title: "Address",
				dataIndex: "address",
				key: "address",
				ellipsis: true,
				sorter: (a, b) =>
					a.address ? a.address.localeCompare(b.address) : null,
				render: (value) => (value ? value : "---"),
				// ...this.getColumnSearchProps("address"),
			},
			// {
			// 	title: "Action",
			// 	key: "action",
			// 	ellipsis: true,
			// 	render: (text, record) => {
			// 		return (
			// 			<button
			// 				className="border-none text-primary text-base"
			// 				onClick={() => showDeleteConfirm(record)}
			// 			>
			// 				Remove
			// 			</button>
			// 		);
			// 	},
			// },
		];

		return (
			<div className="md:w-4/6 w-9/12 mx-auto">
				<Container>
					<div className="flex pb-3 justify-between">
						<h2>Participants' List</h2>
						{/* <button
							className="text-base font-medium border-2 border-grey rounded-md px-2 py-1 text-grey"
							onClick={this.clearAll}
						>
							<span className="align-middle inline-block">
								<MdClear className="w-6 h-6" />
							</span>
							Clear Filters
						</button> */}
					</div>
					<Table
						columns={columns}
						dataSource={this.props.participants}
						size="middle"
						onChange={this.handleChange}
					/>
				</Container>
			</div>
		);
	}
}
