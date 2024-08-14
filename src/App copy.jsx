import { useEffect, useState } from "react";
import api from "./api/api";
import Pagination from "./components/Pagination";
import RecipesTable from "./components/RecipesTable";
import SearchBox from "./components/SearchBox";
import Sorting from "./components/Sorting";
import useRecipes from "./hooks/useRecipes";
import "./styles/App.css";

function AppCopy() {
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

	function setInterceptors(navigate) {
		api.interceptors.request.use(
			function (config) {
				const token = localStorage.getItem("jwtToken");
				config.headers.authorization = `Bearer ${token}`;
				return config;
			},
			function (error) {
				return Promise.reject(error);
			}
		);

		api.interceptors.response.use(
			function (response) {
				response.ok = response.status >= 200 && response.status < 300;
				return response;
			},
			function (error) {
				if (error.response.status == 401 || error.response.status == 403) {
					localStorage.removeItem("jwtToken");
					navigate("login");
					return;
				}
				return Promise.reject(error);
			}
		);
	}

	useEffect(() => {
		setInterceptors();
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

export default AppCopy;
