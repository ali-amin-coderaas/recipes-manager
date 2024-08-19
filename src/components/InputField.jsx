import { InputText } from "primereact/inputtext";

function InputField({ id, label, className = "w-16rem", ...rest }) {
	return (
		<div className="flex justify-content-center align-items-center gap-2 flex-wrap text-center">
			<label htmlFor={id} className="w-6rem">
				{label}
			</label>
			<InputText {...rest} className={className} />
		</div>
	);
}

export default InputField;
