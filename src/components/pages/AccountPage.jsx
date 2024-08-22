import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMallAccounts from "../../hooks/useMallAccounts";
const AccountPage = () => {
	const { loading, error, getAccountById } = useMallAccounts();
	const [account, setAccount] = useState({});

	const { id } = useParams();

	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const account = await getAccountById(id);
				setAccount(account);
			} catch (error) {
				setError(error);
			}
		};
		fetchAccount();
	}, [id]);

	const footer = (
		<div className="flex flex-wrap gap-2">
			<Button
				label="New"
				icon="pi pi-plus"
				severity="success"
				// onClick={}
			/>
			<Button
				label="Delete"
				icon="pi pi-trash"
				severity="danger"
				// onClick={confirmDeleteSelected}
				// disabled={!selectedAccounts || !selectedAccounts.length}
			/>
		</div>
	);

	return (
		<div>
			<Card title={account.name} footer={footer}></Card>
		</div>
	);
};

export default AccountPage;
