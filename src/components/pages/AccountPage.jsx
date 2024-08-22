import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useMallAccounts from "../../hooks/useMallAccounts";

import { useNavigate } from "react-router-dom";
import AccountPageHeader from "../AccountPageHeader";

const AccountPage = () => {
	const { loading, error, getAccountById, deleteAccountById } =
		useMallAccounts();
	const [account, setAccount] = useState({});
	const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
	const navigate = useNavigate();
	const toast = useRef(null);

	const { id } = useParams();

	const confirmDeleteAccount = () => {
		setDeleteAccountDialog(true);
	};
	const hideDeleteAccountDialog = () => {
		setDeleteAccountDialog(false);
	};
	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const account = await getAccountById(id);
				setAccount(account);
			} catch (error) {
				console.error(error);
			}
		};
		fetchAccount();
	}, [id]);

	const deleteAccount = async () => {
		console.log(id);

		try {
			await deleteAccountById(id);
			navigate("/accounts");
			setDeleteAccountDialog(false);
			toast.current.show({
				severity: "success",
				summary: "Successful",
				detail: "Account Deleted",
				life: 3000,
			});
		} catch (error) {
			toast.current.show({
				severity: "danger",
				summary: "Error",
				detail: "Failed to delete account",
				life: 3000,
			});
		}
	};

	const deleteAccountDialogFooter = (
		<>
			<Button
				label="Cancel"
				icon="pi pi-times"
				outlined
				onClick={hideDeleteAccountDialog}
			/>
			<Button
				label="Delete"
				icon="pi pi-trash"
				severity="danger"
				onClick={deleteAccount}
			/>
		</>
	);

	return (
		<div className="mt-8 mx-4 md:mx-8">
			<Toast ref={toast}></Toast>
			<AccountPageHeader loading={loading} account={account} />

			<Dialog
				visible={deleteAccountDialog}
				style={{ width: "32rem" }}
				breakpoints={{ "960px": "75vw", "641px": "90vw" }}
				header="Confirm"
				modal
				footer={deleteAccountDialogFooter}
				onHide={hideDeleteAccountDialog}
			>
				<div className="confirmation-content">
					<i
						className="pi pi-exclamation-triangle mr-3"
						style={{ fontSize: "2rem" }}
					/>
					{account && (
						<span>
							Are you sure you want to delete <b>{account.name}</b>?
						</span>
					)}
				</div>
			</Dialog>
		</div>
	);
};

export default AccountPage;
