import api from "./api";

/**
 * Retrieves all accounts from the server.
 * @returns {Promise<object[]>} An array of objects containing the accounts' information
 */
export const getAllAccounts = async (): Promise<object[]> => {
	try {
		const response = await api.get("/accounts");
		return response.data;
	} catch (error) {
		throw error;
	}
};

/**
 * Retrieves a single account by its id
 * @param {number} id The account's id
 * @returns {Promise<object>} The account's information
 */
export const getById = async (id: number): Promise<object> => {
	try {
		const response = await api.get(`/accounts/${id}`);
		return response.data;
	} catch (error) {
		throw error;
	}
};

/**
 * Creates a new account with the given data
 * @param {object} data The account's information
 * @returns {Promise<object>} The created account's information
 */
export const createAccount = async (data: object): Promise<object> => {
	try {
		const response = await api.post(`/accounts/`, data);
		return response.data;
	} catch (error) {
		throw error;
	}
};
