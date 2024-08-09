import { useEffect, useState } from "react";
import { fetchRecipes } from "../api/recipesAPI";

const useRecipes = (currentPage, searchQuery, sortOption, recipesPerPage) => {
	const [loading, setLoading] = useState(true);
	const [recipes, setRecipes] = useState([]);
	const [totalRecipes, setTotalRecipes] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const skip = (currentPage - 1) * recipesPerPage;

				const data = await fetchRecipes(
					searchQuery,
					recipesPerPage,
					skip,
					sortOption.sortBy,
					sortOption.order
				);

				setRecipes(data.recipes.recipes);
				setTotalRecipes(data.total);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [currentPage, searchQuery, sortOption, recipesPerPage]);

	return { loading, recipes, totalRecipes };
};

export default useRecipes;
