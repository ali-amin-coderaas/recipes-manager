import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setupInterceptors } from "../api/api";
import Pagination from "../components/Pagination";
import RecipesTable from "../components/RecipesTable";
import SearchBox from "../components/SearchBox";
import Sorting from "../components/Sorting";
import useRecipes from "../hooks/useRecipes";
import "../styles/App.css";

function RecipesView() {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState({
		sortBy: "",
		order: "",
	});
	const recipesPerPage = 6;
	const navigate = useNavigate();

	const { loading, recipes, totalRecipes } = useRecipes(
		currentPage,
		searchQuery,
		sortOption,
		recipesPerPage
	);

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

	useEffect(() => {
		setupInterceptors();
	}, []);

	return (
		<>
			<div className="container">
				<div className="header">
					<SearchBox onInputChange={handleInputChange} />
					<Sorting onSortChange={handleSortChange} />
				</div>

				<RecipesTable recipes={recipes} loading={loading} />

				<Pagination
					currentPage={currentPage}
					totalRecipes={totalRecipes}
					recipesPerPage={recipesPerPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</>
	);
}

export default RecipesView;
