import api from "./api";

export const loginUser = async (email, password) => {
	try {
		const response = await api.post(
			"/auth/login",
			JSON.stringify({ email, password })
		);

		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const registerUser = async (first_name, last_name, email, password) => {
	try {
		const response = await api.post("/auth/register", {
			first_name,
			last_name,
			email,
			password,
		});
		return response.data;
	} catch (error) {
		console.error(error);
	}
};
