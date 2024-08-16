import { Paginator } from "primereact/paginator";
import PropTypes from "prop-types";
import { useState } from "react";

const Pagination = ({
	currentPage,
	totalRecipes,
	recipesPerPage,
	onPageChange,
}) => {
	const [first, setFirst] = useState((currentPage - 1) * recipesPerPage);

	const onPageChangeHandler = (event) => {
		const newPage = event.page + 1;
		setFirst(event.first);
		onPageChange(newPage);
	};

	return (
		<div className="">
			<Paginator
				first={first}
				rows={recipesPerPage}
				totalRecords={totalRecipes}
				onPageChange={onPageChangeHandler}
				rowsPerPageOptions={[recipesPerPage]}
				template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
			/>
		</div>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalRecipes: PropTypes.number.isRequired,
	recipesPerPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
