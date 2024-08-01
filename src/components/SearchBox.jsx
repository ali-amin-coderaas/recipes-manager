import React from "react";

const SearchBox = ({ onInputChange }) => {
	const handleInputChnage = (event) => {
		onInputChange(event.target.value);
	};
	return (
		<div className="search-box">
			<input
				type="text"
				name=""
				id=""
				placeholder="Search by name"
				onChange={handleInputChnage}
			/>
		</div>
	);
};

export default SearchBox;
