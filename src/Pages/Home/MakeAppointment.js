import React from 'react';
import appointment from '../../assets/images/appointment.png';
import doctor from '../../assets/images/doctor.png';

const MakeAppointment = () => {
	return (
		<section style={{
			background: `url(${appointment})`
		}}
			className='flex items-center justify-center'>
			<div className='flex-1 hidden lg:block'>
				<img className='mt-[-100px]' src={doctor} alt="" />
			</div>
			<div className='flex-1 px-5'>
				<h3 className='text-xl font-bold text-primary'>Appointment</h3>
				<h2 className='py-5 text-3xl text-white'>Make an Appointment Today</h2>
				<p className='pb-5 text-white'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente earum ab cupiditate autem accusantium expedita sequi, temporibus, aut illo doloribus quaerat explicabo, assumenda consectetur est vel ad sed maiores doloremque consequatur. Amet consequuntur quibusdam autem, quod maxime qui itaque quaerat.</p>
				<div className="justify-start card-actions">
					<button className="btn btn-primary">Get Started</button>
				</div>
			</div>
		</section>
	);
};

export default MakeAppointment;