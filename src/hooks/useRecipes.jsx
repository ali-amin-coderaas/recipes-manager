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
		let isMounted = true;
		const fetchData = async () => {
			setLoading(true);
			setHasError(false);

			try {
				const skip = (currentPage - 1) * recipesPerPage;

				const data = await fetchRecipes(
					searchQuery,
					recipesPerPage,
					skip,
					sortOption.sortBy,
					sortOption.order
				);

				if (isMounted) {
					setRecipes(data.recipes.recipes);
					setTotalRecipes(data.total);
				}
			} catch (error) {
				console.error("Error fetching recipes: ", error);
				if (isMounted) {
					setHasError(true);
					navigate("/login");
				}
			} finally {
				if (isMounted) setLoading(false);
			}
		};
		if (!hasError) {
			fetchData();
		}

		return () => {
			isMounted = false;
		};
	}, [currentPage, searchQuery, sortOption, recipesPerPage]);

	return { loading, recipes, totalRecipes };
};

export default useRecipes;
