import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

const SearchBox = ({ onInputChange }) => {
	return (
		<InputText v-model="value1" placeholder="Search" onChange={onInputChange} />
	);
};

SearchBox.propTypes = {
	onInputChange: PropTypes.func.isRequired,
};

export default SearchBox;
