import { hostedEndpoint, localEndpoint } from "./Endpoints";

export const loginUser = async (email, password) => {
	try {
		const response = await fetch(`${localEndpoint}/login`, {
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
