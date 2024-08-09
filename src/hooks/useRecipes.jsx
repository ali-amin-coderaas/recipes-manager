// ./src/hooks/useRecipes.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../api/recipesAPI";

const useRecipes = (currentPage, searchQuery, sortOption, recipesPerPage) => {
	const [loading, setLoading] = useState(true);
	const [recipes, setRecipes] = useState([]);
	const [totalRecipes, setTotalRecipes] = useState(0);
	const [hasError, setHasError] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			setHasError(false);

			try {
				const skip = (currentPage - 1) * recipesPerPage;

				const response = await fetchRecipes(
					searchQuery,
					recipesPerPage,
					skip,
					sortOption.sortBy,
					sortOption.order
				);

				// if (response.status == 401 || response.status == 403) {
				// 	localStorage.removeItem("jwtToken");
				// 	navigate("/login");
				// 	return;
				// }

				const recipes = response.data.recipes.recipes;
				setRecipes(recipes);
				setTotalRecipes(response.data.total);
			} catch (error) {
				console.error("Error fetching recipes: ", error);
				setHasError(true);
				localStorage.removeItem("jwtToken");
				navigate("/login");
			} finally {
				setLoading(false);
			}
		};
		if (!hasError) {
			fetchData();
		}
		return;
	}, [currentPage, searchQuery, sortOption, recipesPerPage]);

	return { loading, recipes, totalRecipes };
};

export default useRecipes;
