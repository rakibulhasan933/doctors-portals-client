import React, { useEffect, useState } from 'react';
import chair from '../../assets/images/chair.png';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import bg from '../../assets/images/bg.png';
import { format } from 'date-fns';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';


const BannerAppointment = () => {
	const [services, setServices] = useState([]);
	const [user] = useAuthState(auth);
	useEffect(() => {
		fetch('https://doctors-portal-server-tau.vercel.app/services')
			.then(res => res.json())
			.then(data => setServices(data))
	}, []);
	// const { isLoading, data: services, refetch } = useQuery(['available', formattedDate, () => fetch(`https://doctors-portal-server-tau.vercel.app/available?date=${formattedDate}`)
	// 	.then(res => res.json())]);

	// if (isLoading) {
	// 	return <Loading></Loading>
	// }

	const [date, setDate] = useState(new Date());
	const [treatment, setTreatment] = useState();

	const formattedDate = format(date, 'PP');

	const handleBookingFrom = (event) => {
		event.preventDefault();
		const servicesName = treatment?.name;
		const slot = event.target.slot.value;
		const date = event.target.date.value;
		const phone = event.target.phoneNumber.value;
		const patient = event.target.name?.value;
		const email = event.target.email?.value;

		const booking = {
			treatmentId: treatment?._id,
			treatmentName: servicesName,
			slot,
			date,
			phone,
			patient,
			email
		};
		fetch('https://doctors-portal-server-tau.vercel.app/booking', {
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
				} else {
					toast.error(`Already have and appointment on ${data.booking?.date} at ${data.booking?.slot}`)
				}
				// refetch();
				setTreatment(null);
			});
	}

	return (
		<>
			<div style={{ background: `url(${bg})` }} className="min-h-screen hero bg-base-200">
				<div className="flex-col hero-content lg:flex-row">
					<div className='w-1/2'>
						<DayPicker
							mode="single"
							selected={date}
							onSelect={setDate}
						/>
					</div>
					<img src={chair} className="w-1/2 rounded-lg shadow-2xl" alt='chair' />
				</div>
			</div>
			<section>
				{date && <p className='my-8 text-xl font-semibold text-center'>Your Pick Time :{formattedDate} </p>}
				<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
					{services && services.map((item) => <section key={item._id} className='mx-6' >
						<div className="shadow-xl card lg:max-w-lg bg-base-100">
							<div className="card-body">
								<h2 className="text-xl font-semibold text-center">{item.name}</h2>
								<p className='text-center '>{
									item.slots.length > 0 ? <span>{item.slots[0]}</span> : <span className='text-red-400 '> Not available Slots</span>
								}</p>
								<p className='text-center '>{item.slots.length} spaces available </p>
								{item.slots.length !== 0 && <div className="justify-center card-actions">
									<label htmlFor="booking-modal" className="btn btn-primary" onClick={() => setTreatment(item)}>Book Appointment</label>
								</div>}
							</div>
						</div>
					</section>)}
				</div>
				{treatment && <div>
					<input type="checkbox" id="booking-modal" className="modal-toggle" />
					<div className="modal modal-bottom sm:modal-middle">
						<div className="modal-box">
							<label htmlFor="booking-modal" className="absolute btn btn-sm btn-circle right-2 top-2">???</label>
							<h3 className="text-lg font-bold text-center">Booking For: {treatment.name} </h3>
							<form onSubmit={handleBookingFrom} className='grid grid-cols-1 gap-4 mt-3 justify-items-center'>
								<input type="text" name="date" disabled value={formattedDate} className="w-full max-w-xs input input-bordered" />
								<select name="slot" className="w-full max-w-xs select select-bordered">
									{
										treatment.slots.map((slot, index) => <option key={index} value={slot} >
											{slot}
										</option>)
									}
								</select>
								<input type="name" name="name" disabled value={user?.displayName || ''} className="w-full max-w-xs input input-bordered" required />
								<input type="email" name="email" disabled value={user?.email || ''} className="w-full max-w-xs input input-bordered" required />
								<input type="number" name="phoneNumber" placeholder="Phone" className="w-full max-w-xs input input-bordered" required />
								<input type="submit" value="Submit" className="w-full max-w-xs font-semibold uppercase cursor-pointer input input-bordered bg-cyan-300" />
							</form>
						</div>
					</div>
				</div>}
			</section>
		</>
	);
};

export default BannerAppointment;