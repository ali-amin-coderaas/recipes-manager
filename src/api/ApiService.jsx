import api from "./api";

class ApiService {
	constructor(endpoint) {
		this.endpoint = endpoint;
	}

	async getAll(page, pageSize, searchQuery) {
		try {
			const response = await api.get(`/${this.endpoint}`, {
				params: {
					page: page,
					pageSize: pageSize,
					q: searchQuery,
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
				data: response.data.data.items,
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
			return {
				data: {
					id: response.data.data.items.id,
				},
			};
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
}

export default ApiService;
