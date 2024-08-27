import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useMallAccounts from "../../hooks/useMallAccounts";

import { useLocation, useNavigate } from "react-router-dom";
import AccountPageHeader from "../AccountPageHeader";

const AccountPage = () => {
	const { loading, getAccountById } = useMallAccounts();
	const [account, setAccount] = useState({});
	const navigate = useNavigate();
	const location = useLocation();

	const { id } = useParams();

	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const account = await getAccountById(id);
				if (!account) {
					navigate("/accounts");
					throw new Error("Account not found");
				}
				setAccount(account);
			} catch (error) {
				console.error(error);
			}
		};
		fetchAccount();
	}, [id, location.state]);

	return (
		<div className="mt-8 mx-4 md:mx-8">
			<AccountPageHeader loading={loading} account={account} />
		</div>
	);
};

export default AccountPage;
