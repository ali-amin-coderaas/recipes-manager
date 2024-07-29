import { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [Loading, setLoading] = useState(true);
	const [Recipes, setRecipes] = useState([]);
	//function to fetch all recipes:
	const fetchRecipes = async () => {
		try {
			const response = await fetch("https://dummyjson.com/recipes?limit=6");
			const data = await response.json();
			setRecipes(data.recipes);
			setLoading(false);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchRecipes();
	}, []);
	return (
		<main>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>Recipe Name</th>
							<th>Ingredients</th>
							<th>Instructions</th>
						</tr>
					</thead>
					<tbody>
						{!Loading ? (
							Recipes.map((recipes) => (
								<tr key={recipes.id}>
									<td>{recipes.name}</td>
									<td> {recipes.ingredients.join(", ")}</td>
									<td> {recipes.instructions.join(" ")} </td>
								</tr>
							))
						) : (
							<tr>
								<td>Fetching Data</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</main>
	);
}

export default App;
