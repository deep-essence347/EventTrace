import { v4 } from "uuid";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadFile = async ({ file, folderRef } = {}) => {
	try {
		if (file == null) return;
		const filePath = `${folderRef + "/" + file.name + v4()}`;
		const fileRef = ref(storage, filePath);
		const snapshot = await uploadBytes(fileRef, file);
		const fileUrl = await getDownloadURL(snapshot.ref);
		// console.log(`Uploaded Image Success : ${imageUrl}`);
		return fileUrl;
	} catch (error) {
		console.log(error);
	}
};
