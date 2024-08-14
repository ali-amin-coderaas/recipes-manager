import api from "../api/api.jsx";

export const fetchRecipes = async (searchQuery, limit, skip, sortBy, order) => {
	try {
		const response = await api.get("/recipes", {
			params: {
				q: searchQuery,
				limit: limit,
				skip: skip,
				sortBy: sortBy,
				order: order,
			},
		});

		return response;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		throw error;
	}
};
