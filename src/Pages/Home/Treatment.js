import React from 'react';
import Treat from '../../assets/images/treatment.png';

const Treatment = () => {
	return (
		<div className='my-16'>
			<div className="p-6 shadow-xl card lg:card-side">
				<div className='w-1/2 '>
					<figure>
						<img className='w-full max-h-96 rounded-xl' src={Treat} alt="Album" />
					</figure>
				</div>
				<div className="w-1/2 card-body">
					<h2 className="card-title">Exceptional Dental Care, <br /> on Your Terms</h2>
					<p>Dentists recommend that you clean your dentures at least once daily. It's even better to brush your dentures twice a day. It's a good idea to brush your dentures when you wake up in the morning and before going to bed at night. You should also soak them in a mild soap or a dental cleaning solution each night.</p>
					<div className="justify-start card-actions">
						<button className="btn btn-primary">Get Start</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Treatment;