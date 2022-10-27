import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { useState } from 'react';

const CheckoutFrom = () => {
	const [cardError, setCardError] = useState('');
	const stripe = useStripe();
	const elements = useElements();

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
				<button className='mt-4 btn btn-success btn-sm' type="submit" disabled={!stripe}>
					Pay
				</button>
			</form>
			{cardError && <p className='text-red-500  font-extralight'>{cardError}</p>}
		</>
	);
};

export default CheckoutFrom;