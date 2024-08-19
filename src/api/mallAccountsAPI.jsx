import api from "./api";

export const fetchMallAccounts = async () => {
	try {
		const response = await api.get("/accounts");
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
