import PropTypes from "prop-types";

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

	const handleFirstPage = () => {
		if (currentPage > 1) {
			onPageChange(1);
		}
	};

	const handleNextPage = () => {
		if (currentPage * recipesPerPage < totalRecipes) {
			onPageChange(currentPage + 1);
		}
	};

	const handleLastPage = () => {
		const lastPage = Math.ceil(totalRecipes / recipesPerPage);
		if (currentPage < lastPage) {
			onPageChange(lastPage);
		}
	};

	return (
		<div className="pagination">
			<button onClick={handleFirstPage} disabled={currentPage === 1}>
				{"<<"}
			</button>
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
			<button
				onClick={handleLastPage}
				disabled={currentPage * recipesPerPage >= totalRecipes}
			>
				{">>"}
			</button>
		</div>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number,
	totalRecipes: PropTypes.number,
	recipesPerPage: PropTypes.number,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
