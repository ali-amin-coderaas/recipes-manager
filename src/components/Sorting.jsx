import React from "react";

const Sorting = ({ onSortChange }) => {
	const handleSortChange = (event) => {
		onSortChange(event.target.value);
	};
	return (
		<select name="sorting" id="sorting" className="sorting-select">
			<option value="defualt">sort by</option>
			<option value="calories-desc">Calories high to low</option>
			<option value="calories-asc">Calories low to high</option>
			<option value="name-az">Name A to Z</option>
			<option value="ingredients-desc">Ingredients low to high</option>
		</select>
	);
};

export default Sorting;
