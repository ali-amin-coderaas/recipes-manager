import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import PropTypes from "prop-types";
import { useState } from "react";
import useRecipes from "../hooks/useRecipes";
import "../styles/RecipesTable.css";
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
	const [first, setFirst] = useState(0);

	const { loading, recipes, totalRecipes } = useRecipes(
		currentPage,
		searchQuery,
		sortOption,
		recipesPerPage
	);

	const handleSortChange = (sortOption) => {
		setSortOption(sortOption);
		setCurrentPage(1);
		setFirst(0);
	};

	const handleInputChange = (event) => {
		setSearchQuery(event.target.value);
		setCurrentPage(1);
		setFirst(0);
	};

	const onPageChange = (event) => {
		setFirst(event.first);
		setCurrentPage(event.page + 1);
	};

	const header = (
		<div className="header">
			<div c>
				<span className="title">Recipes</span>
				<SearchBox onInputChange={handleInputChange} />
			</div>
			<Sorting onSortChange={handleSortChange} />
		</div>
	);

	return (
		<DataTable
			value={recipes}
			// loading={loading}
			header={header}
			paginator
			rows={recipesPerPage}
			first={first}
			totalRecords={totalRecipes}
			onPage={onPageChange}
			tableStyle={{ minWidth: "50rem", borderRadius: "2rem" }}
			scrollable
		>
			<Column field="name" header="Recipe Name" />
			<Column field="ingredients" header="Ingredients" />
			<Column field="instructions" header="Instructions" />
			<Column field="servings" header="Servings" />
			<Column field="caloriesPerServing" header="Calories per serving" />
		</DataTable>
	);
};

export default RecipesTable;
