import React from 'react';
import { Outlet } from 'react-router-dom';

const Dashboard = () => {
	return (
		<div className="drawer drawer-mobile">
			<input id="my-dashboard" type="checkbox" className="drawer-toggle" />
			<div className="flex flex-col items-center justify-center drawer-content">
				<Outlet />
			</div>
			<div className="drawer-side">
				<label tabIndex={1} htmlFor="my-dashboard" className="drawer-overlay"></label>
				<ul className="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
					<li><a>Sidebar Item 1</a></li>
					<li><a>Sidebar Item 2</a></li>
				</ul>

			</div>
		</div>
	);
};

export default Dashboard;