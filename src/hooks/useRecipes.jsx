import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../api/recipesAPI";

const useRecipes = (currentPage, searchQuery, sortOption, recipesPerPage) => {
	const [loading, setLoading] = useState(true);
	const [recipes, setRecipes] = useState([]);
	const [totalRecipes, setTotalRecipes] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);

			try {
				const skip = (currentPage - 1) * recipesPerPage;

				const response = await fetchRecipes(
					searchQuery,
					recipesPerPage,
					skip,
					sortOption.sortBy,
					sortOption.order
				);

				if (response.status != 200) {
					localStorage.removeItem("jwtToken");
					navigate("/login");
					return;
				}

				setRecipes(response.data.recipes.recipes);
				setTotalRecipes(response.data.total);
			} catch (error) {
				console.error(error);
				navigate("/login");
				return;
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [currentPage, searchQuery, sortOption, recipesPerPage]);

	return { loading, recipes, totalRecipes };
};

export default useRecipes;
