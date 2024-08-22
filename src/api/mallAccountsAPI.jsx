import api from "./api";

export const getAllAccounts = async () => {
	try {
		const response = await api.get("/accounts");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const getById = async (id) => {
	try {
		const response = await api.get(`/accounts/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const deleteAccount = async (id) => {
	try {
		await api.delete(`/accounts/${id}`);
	} catch (error) {
		console.error(error);
	}
};

export const createAccount = async (data) => {
	try {
		const response = await api.post(`/accounts/`, data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
