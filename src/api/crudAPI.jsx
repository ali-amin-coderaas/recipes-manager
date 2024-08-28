import api from "./api";

export const getAll = async (endpoint, page, pageSize) => {
	try {
		const response = await api.get(
			`/${endpoint}/?page=${page}&pageSize=${pageSize}`
		);
		return {
			data: response.data.data.items,
			pagination: {
				totalItems: response.data.data.pagination.totalItems,
				currentPage: parseInt(response.data.data.pagination.currentPage, 10),
				pageSize: parseInt(response.data.data.pagination.pageSize, 10),
				totalPages: response.data.data.pagination.totalPages,
			},
		};
	} catch (error) {
		console.error(error);
		throw error;
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

export const softDeleteAccount = async (id) => {
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
