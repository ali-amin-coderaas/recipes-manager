import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Skeleton } from "primereact/skeleton";
import React from "react";
const SkeletonFloatLabel = ({
	id,
	value,
	onChange,
	label,
	loading,
	...rest
}) => {
	return (
		<div className="float-label">
			{loading ? (
				<Skeleton width="16rem" height="2rem" />
			) : (
				<FloatLabel>
					<InputText id={id} value={value} onChange={onChange} {...rest} />
					<label htmlFor={id}>{label}</label>
				</FloatLabel>
			)}
		</div>
	);
};

export default SkeletonFloatLabel;
