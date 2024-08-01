import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import RecipesTable from "./components/RecipesTable";
import SearchBox from "./components/SearchBox";
import Sorting from "./components/Sorting";

function App() {
	const [Loading, setLoading] = useState(true);
	const [Recipes, setRecipes] = useState([]);
	const [CurrentPage, setCurrentPage] = useState(1);
	const [TotalRecipes, setTotalRecipes] = useState(0);
	const [SearchQuery, setSearchQuery] = useState("");
	const [SortOption, setSortOption] = useState({
		sortBy: "",
		order: "",
	});
	const RecipesPerPage = 6;
	//function to fetch all recipes:
	const fetchRecipes = async (searchQuery, limit, skip, sortBy, order) => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://dummyjson.com/recipes/search?q=${searchQuery}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
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
		fetchRecipes(
			SearchQuery,
			RecipesPerPage,
			skip,
			SortOption.sortBy,
			SortOption.order
		);
	}, [CurrentPage, SortOption, SearchQuery]);

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const handleSortChange = (sortOption) => {
		setSortOption(sortOption);
		setCurrentPage(1);
	};

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
	};

	return (
		<>
			<div className="container">
				<div className="header">
					<SearchBox onInputChange={handleInputChange} />
					<Sorting onSortChange={handleSortChange} />
				</div>

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
