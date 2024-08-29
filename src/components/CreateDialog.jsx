import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

const CreateDialog = ({ onSubmit, visible, onHide, fields = [] }) => {
	const [formData, setFormData] = useState({});

	const handleInputChange = (e, fieldName) => {
		const val = e.target.value;
		setFormData({ ...formData, [fieldName]: val });
	};

	const handleSubmit = () => {
		onSubmit(formData);
	};

	const dialogFooter = (
		<div className="flex justify-content-end">
			<Button label="Cancel" icon="pi pi-times" onClick={onHide} outlined />

			<Button label="Save" icon="pi pi-check" onClick={handleSubmit} />
		</div>
	);

	return (
		<Dialog
			visible={visible}
			style={{ width: "32rem" }}
			breakpoints={{ "960px": "75vw", "641px": "90vw" }}
			header="Create"
			modal
			className="p-fluid"
			footer={dialogFooter}
			onHide={onHide}
		>
			{fields.map((field, index) => (
				<div key={index} className="field">
					<label htmlFor={field.name}>{field.label}</label>
					<InputText
						id={field.name}
						value={formData[field.name] || ""}
						onChange={(e) => handleInputChange(e, field.name)}
						type={field.type || "text"}
					/>
				</div>
			))}
		</Dialog>
	);
};

export default CreateDialog;
