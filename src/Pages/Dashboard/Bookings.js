import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const Bookings = () => {
	const { data: bookings, isLoading } = useQuery(['bookings'], () => fetch('https://doctors-portal-server-tau.vercel.app/bookings', {
		method: 'GET',
		headers: {
			authorization: `Bearer ${localStorage.getItem('accessToken')}`
		}
	})
		.then(res => res.json()))

	if (isLoading) {
		return <Loading />
	}
	return (
		<div>
			<div className="overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th></th>
							<th>Email</th>
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
							bookings.map((a, index) => <tr key={a._id}>
								<th>{index + 1}</th>
								<td>{a.patient}</td>
								<td>{a.patientName}</td>
								<td>{a.date}</td>
								<td>{a.slot}</td>
								<td>{a.treatment}</td>
								<td>{(a.paid) ? <span className='text-success'>Paid</span> : <p className='text-red-500'>not Paid</p>}</td>
								<td>{(a?.transactionId) && <p className='text-green-500'>{a.transactionId}</p>} </td>
							</tr>)
						}


					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Bookings;