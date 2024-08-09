import PropTypes from "prop-types";

const Sorting = ({ onSortChange }) => {
	const handleSortChange = (event) => {
		const [sortBy, order] = event.target.value.split("-");
		onSortChange({ sortBy, order });
	};
	return (
		<select
			name="sorting"
			id="sorting"
			className="sorting-select"
			onChange={handleSortChange}
		>
			<option value="-">sort by</option>
			<option value="caloriesPerServing-desc">Calories high to low</option>
			<option value="caloriesPerServing-asc">Calories low to high</option>
			<option value="name-asc">Name A to Z</option>
		</select>
	);
};

Sorting.propTypes = {
	onSortChange: PropTypes.func.isRequired,
};

export default Sorting;
