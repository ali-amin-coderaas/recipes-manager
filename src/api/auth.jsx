import api from "../api/api.jsx";

export const loginUser = async (email, password) => {
	try {
		const response = await api.post(
			"/login",
			JSON.stringify({ email, password })
		);

		return response.data;
	} catch (error) {
		console.error(error);
	}
};

export const registerUser = async (first_name, last_name, email, password) => {
	try {
		const response = await api.post("/register", {
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
