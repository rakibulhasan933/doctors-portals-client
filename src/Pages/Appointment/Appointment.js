import React, { useState } from 'react';
import AppointmentBanners from './AppointmentBanners';
import AvailableAppointments from './AvailableAppointments';

const Appointment = () => {
	const [date, setDate] = useState(new Date());
	return (
		<div>
			<AppointmentBanners date={date} setDate={setDate} />
			<AvailableAppointments date={date} />
		</div>
	);
};

export default Appointment;