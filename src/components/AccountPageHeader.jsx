import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";
import SkeletonFloatLabel from "./SkeletonFloatLabel";

const AccountPageHeader = ({ loading, account, disabled = true }) => {
	const title = (
		<div className="flex justify-content-center sm:justify-content-between flex-wrap gap-4">
			<SkeletonFloatLabel
				loading={loading}
				id={"account-name"}
				value={account.name}
				label={"Account name"}
				disabled={disabled}
			/>
			<div className="flex gap-2 flex-wrap">
				<Button
					label="Edit"
					icon="pi pi-pencil"
					rounded
					// onClick={}
				/>
				<Button
					label="Delete"
					icon="pi pi-trash"
					severity="danger"
					rounded
					// onClick={}
				/>
			</div>
		</div>
	);

	// const footer = (
	// 	<div className="flex flex-wrap gap-2">
	// <Button
	// 	label="Add new shop"
	// 	icon="pi pi-plus"
	// 	severity="success"
	// 	// onClick={}
	// />
	// 		<Button
	// 			label="Delete"
	// 			icon="pi pi-trash"
	// 			severity="danger"
	// 			onClick={confirmDeleteAccount}
	// 		/>
	// 	</div>
	// );

	return <Card title={title} className="pt-4"></Card>;
};

export default AccountPageHeader;
