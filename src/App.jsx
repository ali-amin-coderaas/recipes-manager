import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [Loading, setLoading] = useState(true);
	const [Recipes, setRecipes] = useState([]);
	const [CurrentPage, setCurrentPage] = useState(1);
	const [TotalRecipes, setTotalRecipes] = useState(0);
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

	const handlePreviousPage = () => {
		if (CurrentPage > 1) {
			setCurrentPage(CurrentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (CurrentPage * RecipesPerPage < TotalRecipes) {
			setCurrentPage(CurrentPage + 1);
		}
	};

	return (
		<main>
			<div className="table-container">
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
							<tr>
								<td>Fetching Data</td>
							</tr>
						)}
					</tbody>
				</table>
				<div className="pagination">
					<button onClick={handlePreviousPage} disabled={CurrentPage === 1}>
						Previous
					</button>
					<span>Page {CurrentPage}</span>
					<button
						onClick={handleNextPage}
						disabled={CurrentPage * RecipesPerPage >= TotalRecipes}
					>
						Next
					</button>
				</div>
			</div>
		</main>
	);
}

export default App;
