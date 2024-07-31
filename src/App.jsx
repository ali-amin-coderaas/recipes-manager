import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import RecipesTable from "./components/RecipesTable";
import Sorting from "./components/Sorting";

function App() {
	const [Loading, setLoading] = useState(true);
	const [Recipes, setRecipes] = useState([]);
	const [CurrentPage, setCurrentPage] = useState(1);
	const [TotalRecipes, setTotalRecipes] = useState(0);
	const [SortOption, setSortOption] = useState({
		sortBy: "name",
		order: "asc",
	});
	const RecipesPerPage = 6;
	//function to fetch all recipes:
	const fetchRecipes = async (limit, skip, sortBy, order) => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
			);
			const data = await response.json();
			setRecipes(data.recipes);
			setTotalRecipes(data.total);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	const sortRecipes = async (sortBy, order) => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://dummyjson.com/recipes?sortBy=${sortBy}&order=${order}`
			);
			const data = await response.json();
			setRecipes(data.recipes);
			setTotalRecipes(data.total);
			setLoading(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		const skip = (CurrentPage - 1) * RecipesPerPage;
		fetchRecipes(RecipesPerPage, skip, SortOption.sortBy, SortOption.order);
	}, [CurrentPage]);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handleSortChange = (sortOption) => {
		setSortOption(sortOption);
	};

	return (
		<>
			<div className="container">
				<Sorting onSortChange={handleSortChange} />

				<RecipesTable recipes={Recipes} loading={Loading} />

				<Pagination
					currentPage={CurrentPage}
					totalRecipes={TotalRecipes}
					recipesPerPage={RecipesPerPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
}

export default App;
