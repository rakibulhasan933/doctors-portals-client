import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';

const Payment = () => {
	const { id } = useParams();

	const url = `http://localhost:5000/bookings/${id}`;

	const { data: appointment, isLoading } = useQuery(['booking', id], () => fetch(url, {
		method: 'GET',
		headers: {
			'authorization': `Bearer ${localStorage.getItem('accessToken')}`
		}
	}).then(res => res.json()));
	if (isLoading) {
		return <Loading />
	};
	const { patientName, treatment, date, price, slot } = appointment;

	return (
		<div className='mx-6'>
			<div className="my-12 shadow-xl card w-96 bg-base-100">
				<div className="card-body">
					<h2 className="font-bold card-title">Hello ,{patientName} </h2>
					<h2 className="card-title">Pay For {treatment}</h2>
					<p>Your Appointment <span className='text-orange-700 '>:{date} -{slot} </span> </p>
					<p>Please Pay $<span className='font-bold '>{price}</span></p>
				</div>
			</div>
			<div className="shadow-xl card w-96 bg-base-100">
				<div className="card-body">
					<h2 className="card-title">Card title!</h2>
					<p>If a dog chews shoes whose shoes does he choose?</p>
					<div className="justify-end card-actions">
						<button className="btn btn-primary">Buy Now</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;