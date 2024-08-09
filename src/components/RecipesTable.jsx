import PropTypes from "prop-types";
import "../styles/RecipesTable.css";

const RecipesTable = ({ recipes, loading }) => {
	return (
		<table>
			<caption>Recipes Manager</caption>
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
				{!loading ? (
					recipes.map((recipe) => (
						<tr key={recipe.id}>
							<td>{recipe.name}</td>
							<td> {recipe.ingredients}</td>
							<td> {recipe.instructions} </td>
							<td> {recipe.servings} </td>
							<td> {recipe.caloriesPerServing} </td>
						</tr>
					))
				) : (
					<tr className="preloader">
						<td colSpan={5}>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
								<path
									fill="none"
									stroke="#000000"
									strokeWidth="15"
									strokeLinecap="round"
									strokeDasharray="300 385"
									strokeDashoffset="0"
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
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
};

RecipesTable.propTypes = {
	recipes: PropTypes.object,
	loading: PropTypes.bool,
	"recipes.map": PropTypes.array,
};

export default RecipesTable;
