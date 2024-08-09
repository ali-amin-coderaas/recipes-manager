import { useNavigate } from "react-router-dom";

export const fetchRecipes = async (searchQuery, limit, skip, sortBy, order) => {
	const token = localStorage.getItem("jwtToken");
	const navigate = useNavigate();
	try {
		const response = await fetch(
			`https://recipes-expressjs-i6wd.onrender.com/recipes?q=${searchQuery}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
			{
				method: "GET",
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			navigate("/login");
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching recipes:", error);
		throw error;
	}
};
