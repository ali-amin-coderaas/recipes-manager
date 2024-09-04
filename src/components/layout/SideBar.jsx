import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { Sidebar } from "primereact/sidebar";
import { StyleClass } from "primereact/styleclass";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
	const [visible, setVisible] = useState(false);
	return (
		<div>
			<Sidebar visible={visible} onHide={() => setVisible(false)}>
				<div className="overflow-y-auto">
					<ul className="list-none p-0 m-0 overflow-hidden">
						<li>
							<Link
								to="/"
								className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
							>
								<i className="pi pi-home mr-2"></i>
								<span className="font-medium">Dashboard</span>
								<Ripple />
							</Link>
						</li>
						<li>
							<Link
								to="/accounts"
								className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full no-underline"
							>
								<i className="pi pi-user mr-2"></i>
								<span className="font-medium">Accounts</span>
								<Ripple />
							</Link>
						</li>
					</ul>
				</div>
			</Sidebar>
			<Button icon="pi pi-bars" onClick={() => setVisible(true)} />
		</div>
	);
};

export default SideBar;
