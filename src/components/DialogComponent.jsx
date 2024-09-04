import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";

const DialogComponent = ({
	onSubmit,
	visible,
	onHide,
	fields = [],
	forUpdate = false,
	initialValue = {},
}) => {
	const [formData, setFormData] = useState({});

	const handleInputChange = (e, fieldName) => {
		const val = e.target.value;
		setFormData({ ...formData, [fieldName]: val });
	};

	const handleSubmit = () => {
		console.log(formData);

		onSubmit(formData);
	};

	const dialogFooter = (
		<div className="flex justify-content-end">
			<Button label="Cancel" icon="pi pi-times" onClick={onHide} outlined />

			<Button label="Save" icon="pi pi-check" onClick={handleSubmit} />
		</div>
	);

	useEffect(() => {
		if (forUpdate && initialValue) setFormData(initialValue);
	}, [initialValue, forUpdate]);

	return (
		<Dialog
			visible={visible}
			style={{ width: "32rem" }}
			breakpoints={{ "960px": "75vw", "641px": "90vw" }}
			header={forUpdate ? "Edit" : "Create"}
			modal
			className="p-fluid"
			footer={dialogFooter}
			onHide={onHide}
		>
			{fields.map((field, index) => {
				if (field.type === "dropdown") {
					return (
						<div key={index} className="field">
							<label htmlFor={field.name}>{field.label}</label>
							<Dropdown
								options={field.options}
								value={formData[field.name]}
								onChange={(e) => handleInputChange(e, field.name)}
								key={index}
								{...field.props}
							/>
						</div>
					);
				}
				if (field.type === "text") {
					return (
						<div key={index} className="field">
							<label htmlFor={field.name}>{field.label}</label>
							<InputText
								id={field.name}
								value={formData[field.name] || ""}
								onChange={(e) => handleInputChange(e, field.name)}
								type={field.type || "text"}
							/>
						</div>
					);
				}
			})}
		</Dialog>
	);
};

export default DialogComponent;
