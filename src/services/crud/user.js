import { message } from "antd";
import {
	collection,
	getDocs,
	addDoc,
	updateDoc,
	getDoc,
	doc,
	query,
	where,
} from "firebase/firestore";
import { updateCurrentUser } from "../../redux/actions/userActions";
import { db } from "../firebase";

const usersCollectionRef = collection(db, "users");

export const UserRole = {
	USER: "user",
	ORGANIZATION: "organization",
};

export const readUsers = async (user, dispatch) => {
	const data = await getDocs(usersCollectionRef);
	return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const readUserById = async (id) => {
	const user = await getDoc(doc(usersCollectionRef, id));
	return { ...user.data(), id: user.id };
};

export const queryUser = async (email) => {
	try {
		let user = null;
		const users = await getDocs(
			query(usersCollectionRef, where("email", "==", email))
		);
		users.forEach((doc) => {
			user = { ...doc.data(), id: doc.id };
		});
		return user;
	} catch (e) {
		message.error("Unable to read user.");
		console.log(e);
	}
};

export const createUser = async (user) => {
	try {
		const doc = await addDoc(usersCollectionRef, user);
		// const newUser = await queryUser(user.email);
		return { ...user, id: doc.id };
	} catch (e) {
		message.error("Unable to create account.");
		console.log(e);
	}
};

export const updateUser = async (data, id, dispatch) => {
	try {
		const document = doc(db, "users", id);
		await updateDoc(document, data);
		if (dispatch) {
			const updatedUser = await readUserById(id);
			dispatch(updateCurrentUser(updatedUser));
		}
	} catch (e) {
		message.error("Unable to update user details.");
		console.log(e);
	}
};
