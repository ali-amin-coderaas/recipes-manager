import { hostedEndpoint, localEndpoint } from "./Endpoints";

export const loginUser = async (email, password) => {
	try {
		const response = await fetch(`${hostedEndpoint}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.error || "Login failed");
		}

		return response.json();
	} catch (error) {
		console.error(error);
	}
};

export const registerUser = async (first_name, last_name, email, password) => {
	try {
		const response = await fetch(`${hostedEndpoint}/register`, {
			headers: { "Content-Type": "application/json" },
			method: "POST",
			body: JSON.stringify({ first_name, last_name, email, password }),
		});
		const id = await response.json();

		return id;
	} catch (error) {
		console.error(error);
	}
};
