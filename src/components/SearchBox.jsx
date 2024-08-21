import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import PropTypes from "prop-types";

const SearchBox = ({ onInputChange }) => {
	return (
		<IconField iconPosition="left">
			<InputIcon className="pi pi-search" />
			<InputText
				type="search"
				onInput={onInputChange}
				placeholder="Search..."
			/>
		</IconField>
	);
};

SearchBox.propTypes = {
	onInputChange: PropTypes.func.isRequired,
};

export default SearchBox;
