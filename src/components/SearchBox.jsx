import PropTypes from "prop-types";

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

SearchBox.propTypes = {
	onInputChange: PropTypes.func.isRequired,
};

export default SearchBox;
