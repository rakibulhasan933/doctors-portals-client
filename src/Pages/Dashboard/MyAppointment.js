import { signOut } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointment = () => {
	const [user] = useAuthState(auth);
	const [appointments, setAppointments] = useState([]);
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			fetch(`https://doctors-portal-server-tau.vercel.app/booking?patient=${user.email}`, {
				method: 'GET',
				headers: {
					'authorization': `Bearer ${localStorage.getItem('accessToken')}`
				}
			})
				.then(res => {
					if (res.status === 401 || res.status === 403) {
						signOut(auth);
						localStorage.removeItem('accessToken');
						navigate('/')
					}
					return res.json()
				})
				.then(data => setAppointments(data))
		}
	}, [user, navigate]);
	return (
		<div>
			<h2>My Appointments: {appointments.length}</h2>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Date</th>
							<th>Time</th>
							<th>Treatment</th>
							<th>Payment</th>
							<th>Transaction ID</th>
						</tr>
					</thead>
					<tbody>
						{
							appointments.map((a, index) => <tr key={a._id}>
								<th>{index + 1}</th>
								<td>{a.patientName}</td>
								<td>{a.date}</td>
								<td>{a.slot}</td>
								<td>{a.treatment}</td>
								<td>{(a.paid) ? <span className='text-success'>Paid</span> : <Link to={`/dashboard/payment/${a._id}`}> <button className=' btn btn-xs btn-success' >Pay</button> </Link>}</td>
								<td>{(a?.transactionId) && <p className='text-green-500'>{a.transactionId}</p>} </td>
							</tr>)
						}


					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyAppointment;