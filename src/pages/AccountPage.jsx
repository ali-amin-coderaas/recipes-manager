import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountPageHeader from "../components/AccountPageHeader";
import ShopsTable from "../components/ShopsTable";
import useApi from "../hooks/useApi";

const AccountPage = () => {
	const { isLoading, getItemById } = useApi("accounts");
	const [account, setAccount] = useState({});
	const navigate = useNavigate();

	const { id } = useParams();

	useEffect(() => {
		const fetchAccount = async () => {
			try {
				const account = await getItemById(id);
				if (!account) {
					navigate("/accounts");
					throw new Error("Account not found");
				}
				setAccount(account);
			} catch (error) {
				throw error;
			}
		};
		fetchAccount();
	}, [id]);

	return (
		<div className="mt-8 mx-4 md:mx-8 flex flex-column gap-4 align-items-center ">
			<h1>Account Information</h1>
			<AccountPageHeader
				loading={isLoading}
				account={account}
				fields={["name"]}
				className="w-full"
			/>
			<ShopsTable className="w-full" id={id} />
		</div>
	);
};

export default AccountPage;
