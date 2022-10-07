import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointments = ({ date }) => {
	const [treatment, setTreatment] = useState(null);

	const formattedDate = format(date, 'PP');
	const { data: services, isLoading, refetch } = useQuery(['available', formattedDate], () => fetch(`https://secret-dusk-46242.herokuapp.com/available?date=${formattedDate}`)
		.then(res => res.json()))

	if (isLoading) {
		return <Loading />
	}
	return (
		<div className='my-10'>
			<h4 className='my-12 text-xl text-center text-secondary'>Available Appointments on {format(date, 'PP')}</h4>
			<div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
				{
					services?.map(service => <Service
						key={service._id}
						service={service}
						setTreatment={setTreatment}
					></Service>)
				}
			</div>
			{treatment && <BookingModal
				date={date}
				treatment={treatment}
				setTreatment={setTreatment}
				refetch={refetch}
			></BookingModal>}
		</div>
	);
};

export default AvailableAppointments;