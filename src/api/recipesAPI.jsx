import { hostedEndpoint } from "./Endpoints";

export const fetchRecipes = async (searchQuery, limit, skip, sortBy, order) => {
	try {
		const response = await fetch(
			`${hostedEndpoint}/recipes?q=${searchQuery}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
		);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		throw error;
	}
};
