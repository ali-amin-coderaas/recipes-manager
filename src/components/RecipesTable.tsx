import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import useRecipes from "../hooks/useRecipes";
import Pagination from "./Pagination";
import SearchBox from "./SearchBox";
import Sorting from "./Sorting";

const RecipesTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortOption, setSortOption] = useState({
		sortBy: "",
		order: "",
	});
	const recipesPerPage = 6;

	const { loading, recipes, totalRecipes } = useRecipes(
		currentPage,
		searchQuery,
		sortOption,
		recipesPerPage
	);

	const handleSortChange = (sortOption) => {
		setSortOption(sortOption);
		setCurrentPage(1);
	};

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
	};

	const onPageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const header = (
		<div className="flex justify-content-between align-items-center flex-wrap gap-2 md:gap-0">
			<span className="text-900 font-bold text-xl">Recipes</span>
			<SearchBox onInputChange={handleInputChange} />
			<Sorting onSortChange={handleSortChange} />
		</div>
	);

	const footer = (
		<Pagination
			currentPage={currentPage}
			totalRecipes={totalRecipes}
			recipesPerPage={recipesPerPage}
			onPageChange={onPageChange}
		/>
	);

	return (
		<div className="">
			<DataTable
				value={recipes}
				loading={loading}
				header={header}
				footer={footer}
				scrollable
				scrollHeight="600px"
			>
				<Column field="name" header="Recipe Name" />
				<Column field="ingredients" header="Ingredients" />
				<Column field="instructions" header="Instructions" />
				<Column field="servings" header="Servings" />
				<Column field="caloriesPerServing" header="Calories per serving" />
			</DataTable>
		</div>
	);
};

export default RecipesTable;
