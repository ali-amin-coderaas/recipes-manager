import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import { classNames } from "primereact/utils";
import React, { useRef, useState } from "react";
import {
	createAccount as apiCreateAccount,
	getAccountById,
} from "../api/mallAccountsAPI";
import useMallAccounts from "../hooks/useMallAccounts";

const MallAccounts = () => {
	const emptyAccount = {
		name: "",
	};

	const { accounts, loading, error, addAccount } = useMallAccounts();
	const [account, setAccount] = useState({});
	const [accountDialog, setAccountDialog] = useState(false);
	const [deleteAccountDialog, setDeleteAccountDialog] = useState(false);
	const [deleteAccountsDialog, setDeleteAccountsDialog] = useState(false);
	const [selectedAccounts, setSelectedAccounts] = useState(null);
	const [submitted, setSubmitted] = useState(false);
	const [globalFilter, setGlobalFilter] = useState(null);
	const toast = useRef(null);

	const dt = useRef(null);
	accounts.forEach((account) => {
		account.createdAt = new Date(account.createdAt).toLocaleDateString();
	});

	const openNew = () => {
		// setAccount(emptyAccount);
		setSubmitted(false);
		setAccountDialog(true);
	};
	const hideDialog = () => {
		setSubmitted(false);
		setAccountDialog(false);
	};

	const hideDeleteAccountDialog = () => {
		setDeleteAccountDialog(false);
	};

	const hideDeleteAccountsDialog = () => {
		setDeleteAccountsDialog(false);
	};

	const createAccount = async () => {
		setSubmitted(true);
		let accountData = account.name.trim();

		if (accountData) {
			try {
				await addAccount(accountData);

				toast.current.show({
					severity: "success",
					summary: "Successful",
					detail: "Account Created",
					life: 3000,
				});

				setAccountDialog(false);
				setAccount({ name: "" });
			} catch (error) {
				toast.current.show({
					severity: "danger",
					summary: "Error",
					detail: "Failed to create account",
					life: 3000,
				});
			}
		}
	};

	const deleteAccount = () => {};
	const deleteSelectedAccounts = () => {};
	const confirmDeleteSelected = () => {};

	const editAccount = (account) => {
		// setAccount({ ...account });
		setAccountDialog(true);
	};

	const onInputChange = (e, name) => {
		const val = (e.target && e.target.value) || "";
		let _account = { ...account };

		_account[`${name}`] = val;

		setAccount(_account);
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			createAccount();
		}
	};

	const header = (
		<div className="flex flex-wrap gap-2 align-items-center justify-content-between">
			<h4 className="m-0">Manage Accounts</h4>
			<IconField iconPosition="left">
				<InputIcon className="pi pi-search" />
				<InputText
					type="search"
					onInput={(e) => setGlobalFilter(e.target.value)}
					placeholder="Search..."
				/>
			</IconField>
		</div>
	);
	const leftToolbarTemplate = () => {
		return (
			<div className="flex flex-wrap gap-2">
				<Button
					label="New"
					icon="pi pi-plus"
					severity="success"
					onClick={openNew}
				/>
				<Button
					label="Delete"
					icon="pi pi-trash"
					severity="danger"
					onClick={confirmDeleteSelected}
					disabled={!selectedAccounts || !selectedAccounts.length}
				/>
			</div>
		);
	};

	const accountDialogFooter = (
		<>
			<Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
			<Button
				label="Create"
				icon="pi pi-check"
				onClick={createAccount}
				onKeyDown={handleKeyDown}
			/>
		</>
	);

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

	const deleteAccountsDialogFooter = (
		<>
			<Button
				label="Cancel"
				icon="pi pi-times"
				outlined
				onClick={hideDeleteAccountsDialog}
			/>
			<Button
				label="Delete"
				icon="pi pi-trash"
				severity="danger"
				onClick={deleteSelectedAccounts}
			/>
		</>
	);

	const actionBodyTemplate = (rowData) => {
		return (
			<div className="flex flex-wrap gap-2">
				<Button
					icon="pi pi-pencil"
					rounded
					outlined
					onClick={() => editAccount(rowData)}
				/>
				<Button
					icon="pi pi-trash"
					rounded
					outlined
					severity="danger"
					onClick={() => confirmDeleteProduct(rowData)}
				/>
			</div>
		);
	};

	return (
		<div>
			<Toast ref={toast} />
			<div className="card">
				<Toolbar className="mb-4" left={leftToolbarTemplate} />
				<DataTable
					scrollable
					scrollHeight="450px"
					ref={dt}
					value={accounts}
					selection={selectedAccounts}
					onSelectionChange={(e) => setSelectedAccounts(e.value)}
					dataKey="id"
					paginator
					rows={10}
					rowsPerPageOptions={[5, 10, 25]}
					paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
					currentPageReportTemplate="Showing {first} to {last} of {totalRecords} accounts"
					header={header}
					loading={loading}
				>
					<Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
					<Column field="id" header="ID" />
					<Column field="name" header="Name" />
					<Column field="shopCount" header=" # of Shops" />
					<Column field="createdAt" header="Created On" />
					<Column body={actionBodyTemplate} exportable={false}></Column>
				</DataTable>
			</div>

			<Dialog
				visible={accountDialog}
				style={{ width: "32rem" }}
				breakpoints={{ "960px": "75vw", "641px": "90vw" }}
				header="Account Details"
				modal
				className="p-fluid"
				footer={accountDialogFooter}
				onHide={hideDialog}
			>
				<div className="field">
					<label htmlFor="name" className="font-bold">
						Name
					</label>
					<InputText
						id="name"
						value={account.name}
						onChange={(e) => onInputChange(e, "name")}
						required
						autoFocus
						className={classNames({ "p-invalid": submitted && !account.name })}
					/>
					{submitted && !account.name && (
						<small className="p-error">Name is required.</small>
					)}
				</div>
			</Dialog>
		</div>
	);
};

export default MallAccounts;
