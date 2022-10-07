import { format } from 'date-fns';
import React from 'react';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const BookingModal = ({ date, treatment, setTreatment, refetch }) => {
	const { _id, name, slots, price } = treatment;
	const [user, loading, error] = useAuthState(auth);
	const formattedDate = format(date, 'PP');
	const handleBooking = event => {
		event.preventDefault();
		const slot = event.target.slot.value;

		const booking = {
			treatmentId: _id,
			treatment: name,
			date: formattedDate,
			slot,
			price,
			patient: user.email,
			patientName: user.displayName,
			phone: event.target.phone.value
		}

		fetch('https://secret-dusk-46242.herokuapp.com/booking', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(booking)
		})
			.then(res => res.json())
			.then(data => {
				if (data.success) {
					toast(`Appointment is set, ${formattedDate} at ${slot}`)
				}
				else {
					toast.error(`Already have and appointment on ${data.booking?.date} at ${data.booking?.slot}`)
				}
				setTreatment(null);
				refetch();
			});
	}
	return (
		<div>
			<input type="checkbox" id="booking-modal" className="modal-toggle" />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">
					<label htmlFor="booking-modal" className="absolute btn btn-sm btn-circle right-2 top-2">✕</label>
					<h3 className="text-lg font-bold text-secondary">Booking for: {name}</h3>
					<form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 mt-2 justify-items-center'>
						<input type="text" disabled value={format(date, 'PP')} className="w-full max-w-xs input input-bordered" />
						<select name="slot" className="w-full max-w-xs select select-bordered">
							{
								slots.map((slot, index) => <option
									key={index}
									value={slot}
								>{slot}</option>)
							}
						</select>
						<input type="text" name="name" disabled value={user?.displayName || ''} className="w-full max-w-xs input input-bordered" />
						<input type="email" name="email" disabled value={user?.email || ''} className="w-full max-w-xs input input-bordered" />
						<input type="text" name="phone" placeholder="Phone Number" className="w-full max-w-xs input input-bordered" />
						<input type="submit" value="Submit" className="w-full max-w-xs btn btn-secondary" />
					</form>
				</div>
			</div>
		</div>
	);
};

export default BookingModal;