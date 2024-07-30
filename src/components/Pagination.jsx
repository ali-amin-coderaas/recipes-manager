import React from "react";

const Pagination = ({
	currentPage,
	totalRecipes,
	recipesPerPage,
	onPageChange,
}) => {
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage * recipesPerPage < totalRecipes) {
			onPageChange(currentPage + 1);
		}
	};
	return (
		<div className="pagination">
			<button onClick={handlePreviousPage} disabled={currentPage === 1}>
				{"<"}
			</button>
			<span> {currentPage} </span>
			<button
				onClick={handleNextPage}
				disabled={currentPage * recipesPerPage >= totalRecipes}
			>
				{">"}
			</button>
		</div>
	);
};

export default Pagination;
