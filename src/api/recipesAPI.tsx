import api from "./api";

/**
 * Fetches recipes from the API.
 *
 * @param {string} searchQuery - Optional search query.
 * @param {number} limit - The maximum number of recipes to return.
 * @param {number} skip - The number of recipes to skip.
 * @param {string} sortBy - The field to sort the recipes by.
 * @param {string} order - The order to sort the recipes in.
 *
 * @returns {Promise<object>} The API response.
 *
 * @throws {Error} If there is an error fetching the recipes.
 */
export const fetchRecipes = async (
	searchQuery: string,
	limit: number,
	skip: number,
	sortBy: string,
	order: string
): Promise<object> => {
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
