import { Dropdown } from "primereact/dropdown";
import PropTypes from "prop-types";
import { useState } from "react";

const Sorting = ({ onSortChange }) => {
	const [selectedSortOption, setSelectedSortOption] = useState(null);

	const sortOptions = [
		{ label: "Calories high to low", value: "caloriesPerServing-desc" },
		{ label: "Calories low to high", value: "caloriesPerServing-asc" },
		{ label: "Name A to Z", value: "name-asc" },
	];

	const handleSortChange = (event) => {
		const [sortBy, order] = event.target.value.split("-");
		setSelectedSortOption(event.value);
		onSortChange({ sortBy, order });
	};
	return (
		<>
			<Dropdown
				value={selectedSortOption}
				onChange={handleSortChange}
				options={sortOptions}
				placeholder="select sort option"
			/>
		</>
	);
};

Sorting.propTypes = {
	onSortChange: PropTypes.func.isRequired,
};

export default Sorting;
