import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountPageHeader from "../components/AccountPageHeader";
import ShopsTable from "../components/ShopsTable";
import useApi from "../hooks/useApi";

const AccountPage = () => {
	const { isLoading, getItemById } = useApi("accounts");
	const [account, setAccount] = useState({});
	const navigate = useNavigate();

	const { accountId } = useParams();

	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const account = await getItemById(accountId);
				if (!account) {
					navigate("/accounts");
					throw new Error("Account not found");
				}
				setAccount(account.data.items);
			} catch (error) {
				throw error;
			}
		};
		fetchAccount();
	}, [accountId]);

	return (
		<div className=" flex flex-column gap-4 align-items-center ">
			<h1>Account Information</h1>
			<AccountPageHeader
				loading={isLoading}
				account={account}
				setAccount={setAccount}
				fields={["name"]}
				className="w-full"
			/>
			<ShopsTable className="w-full" accountId={accountId} />
		</div>
	);
};

export default AccountPage;
