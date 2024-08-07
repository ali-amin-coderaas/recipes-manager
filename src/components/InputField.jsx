import React from "react";
import "../styles/register.css";

const InputField = ({ label, value, onChange, placeholder, type }) => {
	return (
		<div className="input-field">
			<label>
				{label}
				<sup>*</sup>
			</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default InputField;
