const axios = require("axios").default;

export const REQUEST = {
	GET: "GET",
	POST: "POST",
	PUT: "PUT",
	DELETE: "DELETE",
};

const axiosInstance = axios.create({
	baseURL: "http://localhost:8000/",
	timeout: 30000,
});

const getRequest = async (url, { params }) => {
	try {
		const res = await axiosInstance.get(url, {
			params: params,
		});
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

const postRequest = async (url, { data }) => {
	try {
		const res = await axiosInstance.post(url, {
			data: data,
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

const putRequest = async (url, { data }) => {
	try {
		const res = await axiosInstance.put(url, {
			data: data,
		});
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

const deleteRequest = async (url, { data }) => {
	try {
		const res = await axiosInstance.delete(url);
		console.log(res);
		return res.data;
	} catch (err) {
		console.log(err);
	}
};

export const request = async (requestType, { url, data }) => {
	let response;
	switch (requestType) {
		case REQUEST.GET:
			response = await getRequest(url, { params: data });
			break;
		case REQUEST.POST:
			response = await postRequest(url, { data: data });
			break;
		case REQUEST.PUT:
			response = await putRequest(url, { data: data });
			break;
		case REQUEST.DELETE:
			response = await deleteRequest(url, { data: data });
			break;
		default:
			console.log("Invalid Request Type...");
			break;
	}
	if (response.message) console.log(response.message);
	if (response.isSuccess) return response.data;
};
