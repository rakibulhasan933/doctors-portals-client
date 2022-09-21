import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const Navbar = () => {
	const [user] = useAuthState(auth);
	console.log(user);

	const logout = () => {
		signOut(auth);
	}
	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
					</label>
					<ul tabIndex={0} className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
						<li><Link to='/'>Home</Link></li>
						<li><Link to='/about'>About</Link></li>
						<li><Link to='/appointment'>Appointment</Link></li>
						<li><Link to='/reviews'>Reviews</Link></li>
						<li><Link to='/contacts'>Contacts Us</Link></li>
						<li>{user ? <button onClick={logout} className="btn btn-success">Sign Out</button> : <Link to='/login'>Login</Link>}</li>
					</ul>
				</div>
				<Link to='/' className="text-xl normal-case btn btn-ghost">Doctor Portal</Link>
			</div>
			<div className="hidden navbar-center lg:flex">
				<ul className="p-0 menu menu-horizontal">
					<li><Link to='/'>Home</Link></li>
					<li><Link to='/about'>About</Link></li>
					<li><Link to='/appointment'>Appointment</Link></li>
					<li><Link to='/reviews'>Reviews</Link></li>
					<li><Link to='/contacts'>Contacts Us</Link></li>
					<li>{user ? <button onClick={logout} className="btn btn-success">Sign Out</button> : <Link to='/login'>Login</Link>}</li>
				</ul>
			</div>
		</div>
	);
};

export default Navbar;