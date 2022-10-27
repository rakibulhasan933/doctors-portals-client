import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import CheckoutFrom from './CheckoutFrom';

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

	const stripePromise = loadStripe('pk_test_51LxYYCBlHAjml9hYdLMk3IhBHxC1TpjUug6imB1lxYN8Dp3ott8hYrNEzBFqF6gcWLCi7LhMpiHwonHFcUPm4HLM00tK4EcPxT');

	return (
		<div className='mx-6'>
			<div className="w-full my-12 shadow-xl card bg-base-100">
				<div className="card-body">
					<h2 className="font-bold card-title">Hello ,{patientName} </h2>
					<h2 className="card-title">Pay For {treatment}</h2>
					<p>Your Appointment <span className='text-orange-700 '>:{date} -{slot} </span> </p>
					<p>Please Pay $<span className='font-bold '>{price}</span></p>
				</div>
			</div>
			<div className="w-full shadow-xl card bg-base-100">
				<div className="card-body">
					<Elements stripe={stripePromise}>
						<CheckoutFrom />
					</Elements>
				</div>
			</div>
		</div>
	);
};

export default Payment;