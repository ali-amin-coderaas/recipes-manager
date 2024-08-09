import PropTypes from "prop-types";
import "../styles/register.css";

const InputField = ({ label, ...rest }) => {
	return (
		<div className="input-field">
			<label>
				{label}
				<sup>*</sup>
			</label>
			<input {...rest} />
		</div>
	);
};

InputField.propTypes = {
	label: PropTypes.string,
};

export default InputField;
