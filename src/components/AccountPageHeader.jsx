import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import useApi from "../hooks/useApi";
import SkeletonFloatLabel from "./SkeletonFloatLabel";

const AccountPageHeader = ({
	loading,
	account,
	disabled = true,
	fields = {},
	...rest
}) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { deleteItem, updateItem, getItemById } = useApi("accounts");
	const { showToast } = useToast();
	const [editDialogVisible, setEditDialogVisible] = useState(false);
	const [editableAccount, setEditableAccount] = useState({});

	useEffect(() => {
		setEditableAccount({ ...account });
	}, [account]);

	const deleteAccount = async () => {
		try {
			await deleteItem(id);
			navigate("/accounts");
		} catch (error) {
			throw error;
		}
	};

	const editAccount = async () => {
		try {
			await updateItem(id, editableAccount);
			setEditDialogVisible(false);
			window.location.reload();
			showToast("info", "Account updated", "Account updated successfully");
		} catch (error) {
			throw error;
		}
	};

	const handleInputChange = (e, field) => {
		setEditableAccount({
			...editableAccount,
			[field]: e.target.value,
		});
	};

	const confirmDeleteDialog = () => {
		confirmDialog({
			message: "Are you sure you want to delete this account?",
			header: "Confirm",
			icon: "pi pi-exclamation-triangle",
			defaultFocus: "reject",
			accept: () => {
				deleteAccount();
				showToast("success", "Account deleted", "Account deleted successfully");
			},
		});
	};

	const title = (
		<div className="flex justify-content-center sm:justify-content-between flex-wrap gap-4">
			<SkeletonFloatLabel
				loading={loading}
				id={"account-name"}
				value={account.name || ""}
				label={"Account name"}
				disabled={disabled}
			/>
			<div className="flex gap-2 flex-wrap">
				<Button
					label="Edit"
					icon="pi pi-pencil"
					rounded
					onClick={() => setEditDialogVisible(true)}
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
		<div {...rest}>
			<Card title={title} className="pt-4"></Card>

			<Dialog
				visible={editDialogVisible}
				header="Edit Account"
				modal
				onHide={() => setEditDialogVisible(false)}
				footer={
					<div>
						<Button
							label="Cancel"
							onClick={() => setEditDialogVisible(false)}
							className="p-button-text"
						/>
						<Button label="Save" onClick={editAccount} />
					</div>
				}
			>
				{Object.keys(editableAccount).map((field, index) => (
					<div key={index} className="field">
						<label htmlFor={field} className="block">
							{field}
						</label>
						<InputText
							id={field}
							value={editableAccount[field]}
							onChange={(e) => handleInputChange(e, field)}
							className="w-full"
							disabled={
								field === "id" || field === "createdAt" || field === "updatedAt"
							}
						/>
					</div>
				))}
			</Dialog>
			<ConfirmDialog />
		</div>
	);
};

export default AccountPageHeader;
