import { hostedEndpoint, localEndpoint } from "./Endpoints";

export const fetchRecipes = async (searchQuery, limit, skip, sortBy, order) => {
	const token = await localStorage.getItem("jwtToken");
	try {
		const response = await fetch(
			`${localEndpoint}/recipes?q=${searchQuery}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
			{
				method: "GET",
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		throw error;
	}
};
