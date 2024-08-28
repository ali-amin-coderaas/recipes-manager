// import { Button } from "primereact/button";
// import { Dialog } from "primereact/dialog";
// import { InputText } from "primereact/inputtext";
// import { Paginator } from "primereact/paginator";
// import { classNames } from "primereact/utils";
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useToast } from "../context/ToastContext";
// import useAccounts from "../hooks/useAccounts";
// import { formatTimeStamp } from "../utils/FormatTimeStamp";
// import DataTableComponent from "./DataTableComponent";

// const AccountsList = () => {
// 	const {
// 		accounts,
// 		loading,
// 		addAccount,
// 		currentPage,
// 		pageSize,
// 		totalItems,
// 		setCurrentPage,
// 	} = useAccounts();
// 	const [account, setAccount] = useState({});
// 	const [accountDialog, setAccountDialog] = useState(false);
// 	const [selectedAccounts, setSelectedAccounts] = useState(null);
// 	const [submitted, setSubmitted] = useState(false);
// 	const [globalFilter, setGlobalFilter] = useState(null);
// 	const { showToast } = useToast();

// 	accounts.forEach((account) => {
// 		account.createdAt = formatTimeStamp(account.createdAt);
// 	});

// 	const openNew = () => {
// 		setSubmitted(false);
// 		setAccountDialog(true);
// 	};
// 	const hideDialog = () => {
// 		setSubmitted(false);
// 		setAccountDialog(false);
// 		setAccount({ name: "" });
// 	};

// 	const createAccount = async () => {
// 		setSubmitted(true);
// 		let accountData = account.name.trim();
// 		if (accountData) {
// 			try {
// 				await addAccount(accountData);
// 				hideDialog();
// 				showToast("success", "Account created", "Account created successfully");
// 			} catch (error) {
// 				throw error;
// 			}
// 		}
// 	};

// 	const onInputChange = (e, name) => {
// 		const val = e.target?.value?.trim() || "";
// 		setAccount((prevAccount) => ({ ...prevAccount, [name]: val }));
// 	};

// 	const handlePageChange = (event) => {
// 		const newPage = event.page + 1;
// 		setCurrentPage(newPage);
// 	};

// 	const accountDialogFooter = (
// 		<>
// 			<Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
// 			<Button label="Create" icon="pi pi-check" onClick={createAccount} />
// 		</>
// 	);

// 	const handleKeyDown = (event) => {
// 		if (event.key === "Enter") {
// 			createAccount();
// 		}
// 	};

// 	const columns = [
// 		{
// 			field: "id",
// 			header: "ID",
// 			body: (rowData) => rowData.id,
// 		},
// 		{
// 			field: "name",
// 			header: "Name",
// 			body: (rowData) => (
// 				<Link to={`/accounts/${rowData.id}`} className="text-primary">
// 					{rowData.name}
// 				</Link>
// 			),
// 		},
// 		{
// 			field: "shopCount",
// 			header: "# of Shops",
// 			body: (rowData) => rowData.shopCount,
// 		},
// 		{
// 			field: "createdAt",
// 			header: "Created On",
// 			body: (rowData) => formatTimeStamp(rowData.createdAt),
// 		},
// 	];

// 	const footer = (
// 		<Paginator
// 			first={(currentPage - 1) * pageSize}
// 			rows={pageSize}
// 			totalRecords={totalItems}
// 			onPageChange={handlePageChange}
// 			pageLinkSize={3}
// 			rowsPerPageOptions={[5, 10, 25, 50]}
// 			currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Accounts"
// 			template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
// 		/>
// 	);

// 	return (
// 		<div>
// 			<DataTableComponent
// 				data={accounts}
// 				columns={columns}
// 				title="Accounts"
// 				isLoading={loading}
// 				onCreate={openNew}
// 				globalFilter={globalFilter}
// 				setGlobalFilter={setGlobalFilter}
// 				selection={selectedAccounts}
// 				onSelectionChange={setSelectedAccounts}
// 				entity={account}
// 				currentPage={currentPage}
// 				totalItems={totalItems}
// 				pageSize={pageSize}
// 				onPageChange={handlePageChange}
// 				footer={footer}
// 			/>
// 			<Dialog
// 				visible={accountDialog}
// 				style={{ width: "32rem" }}
// 				breakpoints={{ "960px": "75vw", "641px": "90vw" }}
// 				header="Account Details"
// 				modal
// 				className="p-fluid"
// 				footer={accountDialogFooter}
// 				onHide={hideDialog}
// 				onKeyDown={handleKeyDown}
// 			>
// 				<div className="field">
// 					<label htmlFor="name" className="font-bold">
// 						Name
// 					</label>
// 					<InputText
// 						id="name"
// 						value={account.name}
// 						onChange={(e) => onInputChange(e, "name")}
// 						required
// 						autoFocus
// 						className={classNames({ "p-invalid": submitted && !account.name })}
// 					/>
// 					{submitted && !account.name && (
// 						<small className="p-error">Name is required.</small>
// 					)}
// 				</div>
// 			</Dialog>
// 		</div>
// 	);
// };

// export default AccountsList;
