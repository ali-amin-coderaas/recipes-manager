import { useEffect } from "react";
import { setupInterceptors } from "../api/api";
import RecipesTable from "../components/RecipesTable";
import "../styles/RecipesView.css";

function RecipesView() {
	useEffect(() => {
		setupInterceptors();
	}, []);

	return (
		<>
			<div className="recipes-view">
				<RecipesTable />
			</div>
		</>
	);
}

export default RecipesView;
