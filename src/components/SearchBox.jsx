import React from "react";

const SearchBox = ({ onInputChange }) => {
	return (
		<div className="search-box">
			<input
				type="text"
				name=""
				id=""
				placeholder="Search by name"
				onChange={onInputChange}
			/>
		</div>
	);
};

export default SearchBox;
