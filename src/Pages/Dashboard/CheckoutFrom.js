import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const CheckoutFrom = ({ appointment }) => {
	const [cardError, setCardError] = useState('');
	const [clientSecret, setClientSecret] = useState('');
	const [success, setSuccess] = useState('');
	const [processing, setProcessing] = useState(false);
	const [transactionId, setTransactionId] = useState('');

	const stripe = useStripe();
	const elements = useElements();

	const { _id, treatment, date, slot, patientName, price, email } = appointment;


	useEffect(() => {
		fetch('https://doctors-portal-server-tau.vercel.app/create-payment-intent', {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			},
			body: JSON.stringify({ price })
		})
			.then(res => res.json())
			.then(data => {
				if (data?.clientSecret) {
					setClientSecret(data.clientSecret);
				}
			})
	}, [price]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		};
		const card = elements.getElement(CardElement);

		if (card === null) {
			return;
		};
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card,
		});

		setCardError(error?.message || '');
		setSuccess('');
		setProcessing(true);
		// payment
		const { paymentIntent, error: IntentError } = await stripe.confirmCardPayment(
			clientSecret,
			{
				payment_method: {
					card: card,
					billing_details: {
						name: patientName,
						email: email
					},
				},
			},
		);
		if (IntentError) {
			setCardError(IntentError?.message);
			toast.error('Payment Fail Please Try Again');
			setSuccess('');
			setProcessing(false);
		}
		else {
			setCardError('');
			setTransactionId(paymentIntent?.id);
			setSuccess('Your Payment is successfully');
			const payment = {
				name: patientName,
				email: email,
				appointment: _id,
				transactionId: paymentIntent?.id,
				service: treatment,
				date,
				slot
			}
			// database send
			fetch(`https://doctors-portal-server-tau.vercel.app/booking/${_id}`, {
				method: 'PATCH',
				headers: {
					'content-type': 'application/json',
					authorization: `Bearer ${localStorage.getItem('accessToken')}`
				},
				body: JSON.stringify(payment)

			}).then(res => res.json())
				.then(data => {
					setProcessing(false);
					toast.success('Your payment Successfully');
				})
		}

	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '26px',
								color: '#424770',
								'::placeholder': {
									color: '#aab7c4',
								},
							},
							invalid: {
								color: '#9e2146',
							},
						},
					}}
				/>
				<button className='mt-4 btn btn-success btn-sm' type="submit" disabled={!stripe || !clientSecret || success}>
					Pay
				</button>
			</form>
			{cardError && <p className='text-red-500 font-extralight'>{cardError}</p>}
			{success && <div>
				<p className='font-bold text-green-500'>{success}</p>
				<p className='font-bold text-green-500'>Your Transaction ID : <span className='text-orange-500 '>{transactionId} </span></p>
			</div>}
		</>
	);
};

export default CheckoutFrom;