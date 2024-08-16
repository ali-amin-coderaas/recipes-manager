import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

const SearchBox = ({ onInputChange }) => {
	return <InputText onChange={onInputChange} placeholder="Search by name" />;
};

SearchBox.propTypes = {
	onInputChange: PropTypes.func.isRequired,
};

export default SearchBox;
