import { useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";
import Sorting from "./components/Sorting";

function App() {
	const [Loading, setLoading] = useState(true);
	const [Recipes, setRecipes] = useState([]);
	const [CurrentPage, setCurrentPage] = useState(1);
	const [TotalRecipes, setTotalRecipes] = useState(0);
	const [SortOption, setSortOption] = useState();
	const RecipesPerPage = 6;
	//function to fetch all recipes:
	const fetchRecipes = async (limit, skip) => {
		try {
			setLoading(true);
			const response = await fetch(
				`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`
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
		fetchRecipes(RecipesPerPage, skip);
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
				<table>
					<thead>
						<tr>
							<th>Recipe Name</th>
							<th>Ingredients</th>
							<th>Instructions</th>
							<th>Servings</th>
							<th>Calories per serving</th>
						</tr>
					</thead>
					<tbody>
						{!Loading ? (
							Recipes.map((recipe) => (
								<tr key={recipe.id}>
									<td>{recipe.name}</td>
									<td> {recipe.ingredients.join(", ")}</td>
									<td> {recipe.instructions.join(" ")} </td>
									<td> {recipe.servings} </td>
									<td> {recipe.caloriesPerServing} </td>
								</tr>
							))
						) : (
							<tr className="preloader">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
									<path
										fill="none"
										stroke="#FFFFFF"
										stroke-width="15"
										stroke-linecap="round"
										stroke-dasharray="300 385"
										stroke-dashoffset="0"
										d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
									>
										<animate
											attributeName="stroke-dashoffset"
											calcMode="spline"
											dur="2"
											values="685;-685"
											keySplines="0 0 1 1"
											repeatCount="indefinite"
										></animate>
									</path>
								</svg>
							</tr>
						)}
					</tbody>
				</table>
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
