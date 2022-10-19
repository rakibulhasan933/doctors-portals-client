import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../hooks/useAdmin';

const Dashboard = () => {
	const [user] = useAuthState(auth);
	const [admin] = useAdmin(user);
	return (
		<div className="drawer drawer-mobile">
			<input id="my-dashboard" type="checkbox" className="drawer-toggle" />
			<div className="p-8 drawer-content">
				<Outlet />
			</div>
			<div className="drawer-side">
				<label tabIndex={1} htmlFor="my-dashboard" className="drawer-overlay"></label>
				<ul className="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
					<li><Link to="/dashboard">My Appointments</Link></li>
					<li><Link to="/dashboard/review">My Reviews</Link></li>
					<li><Link to="/dashboard/history">My History</Link></li>
					{admin && <>
						<li><Link to="/dashboard/bookings">ALL Booking</Link></li>
						<li><Link to="/dashboard/users">ALL Users</Link></li>
					</>}
				</ul>

			</div>
		</div>
	);
};

export default Dashboard;