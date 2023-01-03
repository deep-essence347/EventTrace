import React from "react";
import { Modal, Form, Input } from "antd";
import { useSelector } from "react-redux";

export const BecomeOrganizerModal = ({ visible, onCreate, onCancel }) => {
	const [form] = Form.useForm();
	const rules = { required: true, message: "Invalid Detail." };
	const { currentUser } = useSelector((state) => state.users);
	return (
		<Modal
			visible={visible}
			title="Become an Organizer"
			okText="Create"
			centered
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form
				form={form}
				layout="vertical"
				name="BecomeOrganizer"
				initialValues={{
					address: currentUser.address,
					phone: currentUser.phone,
					bio: currentUser.bio,
					website: currentUser.website ? currentUser.website : null,
				}}
			>
				<Form.Item label="Address" name={"address"} rules={[rules]}>
					<Input className="form-input" placeholder="Address" />
				</Form.Item>
				<Form.Item label="Phone Number" name={"phone"} rules={[rules]}>
					<Input className="form-input" placeholder="Phone Number" />
				</Form.Item>
				<Form.Item label="Bio" name={"bio"} rules={[rules]}>
					<Input.TextArea
						rows={4}
						className="form-input"
						placeholder="About Yourself"
					/>
				</Form.Item>
				<Form.Item label="Website" name={"website"}>
					<Input className="form-input" placeholder="Website" />
				</Form.Item>
			</Form>
		</Modal>
	);
};
