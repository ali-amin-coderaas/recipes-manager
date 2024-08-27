import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useMallAccounts from "../hooks/useMallAccounts";
import SkeletonFloatLabel from "./SkeletonFloatLabel";

const AccountPageHeader = ({ loading, account, disabled = true }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { deleteAccountById } = useMallAccounts();

	const deleteAccount = async () => {
		try {
			await deleteAccountById(id);
			navigate("/accounts", {
				state: {
					toast: {
						severity: "success",
						summary: "Successful",
						detail: "Account Deleted",
						life: 3000,
					},
				},
			});
		} catch (error) {
			throw error;
		}
	};
	const confirmDeleteDialog = () => {
		confirmDialog({
			message: "Are you sure you want to delete this account?",
			header: "Confirm",
			icon: "pi pi-exclamation-triangle",
			defaultFocus: "reject",
			accept: () => {
				deleteAccount();
			},
		});
	};

	const title = (
		<div className="flex justify-content-center sm:justify-content-between flex-wrap gap-4">
			<SkeletonFloatLabel
				loading={loading}
				id={"account-name"}
				value={account.name || " "}
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
					onClick={confirmDeleteDialog}
				/>
			</div>
		</div>
	);

	return (
		<div>
			<Card title={title} className="pt-4"></Card>
			<ConfirmDialog />
		</div>
	);
};

export default AccountPageHeader;
