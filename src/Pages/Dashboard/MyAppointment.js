import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyAppointment = () => {
	const [user] = useAuthState(auth);
	const [appointments, setAppointments] = useState([]);
	useEffect(() => {
		if (user) {
			fetch(`https://secret-dusk-46242.herokuapp.com/booking?patient=${user.email}`)
				.then(res => res.json())
				.then(data => setAppointments(data))
		}
	}, [user]);
	return (
		<div>
			<h2>My Appointments: {appointments.length}</h2>
			<div class="overflow-x-auto">
				<table class="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Date</th>
							<th>Time</th>
							<th>Treatment</th>
							<th>Payment</th>
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
							</tr>)
						}


					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyAppointment;