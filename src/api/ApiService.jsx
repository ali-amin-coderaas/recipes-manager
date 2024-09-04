import api from "./api";

class ApiService {
	constructor(endpoint) {
		this.endpoint = endpoint;
	}

	async getAll(page, pageSize, searchQuery, sortBy, order) {
		try {
			const response = await api.get(`/${this.endpoint}`, {
				params: {
					page: page,
					pageSize: pageSize,
					q: searchQuery,
					sortBy: sortBy,
					order: order,
				},
			});
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
			throw error;
		}
	}

	async getById(id) {
		try {
			const response = await api.get(`/${this.endpoint}/${id}`);
			return {
				data: response.data,
			};
		} catch (error) {
			throw error;
		}
	}

	async softDelete(id) {
		try {
			await api.delete(`/${this.endpoint}/${id}`);
		} catch (error) {
			throw error;
		}
	}

	async update(id, data) {
		try {
			const response = await api.put(`/${this.endpoint}/${id}`, data);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	async create(data) {
		try {
			const response = await api.post(`/${this.endpoint}/`, data);
			return { data: response.data.data.items };
		} catch (error) {
			throw error;
		}
	}

	async getAccountStats() {
		try {
			const response = await api.get(`/${this.endpoint}/accounts/type`);
			return response.data;
		} catch (error) {
			console.error("Error fetching account stats:", error);
			throw new Error(
				`Failed to fetch account stats: ${
					error.response?.data?.message || error.message
				}`
			);
		}
	}

	async getShopStats() {
		try {
			const response = await api.get(`/${this.endpoint}/shops/industry`);
			return response.data;
		} catch (error) {
			console.error("Error fetching shop stats:", error);
			throw new Error(
				`Failed to fetch shop stats: ${
					error.response?.data?.message || error.message
				}`
			);
		}
	}
}

export default ApiService;
