import React from "react";
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

export default InputField;
