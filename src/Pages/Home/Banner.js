import React from 'react';
import chair from '../../assets/images/chair.png';

const Banner = () => {
	return (
		<div className="hero min-h-screen">
			<div className="hero-content flex-col lg:flex-row-reverse">
				<img src={chair} alt='cover' className=" max-w-md rounded-lg shadow-2xl" />
				<div className=' mx-3'>
					<h1 className="text-4xl font-bold">Box Office News!</h1>
					<p className="py-3">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi  exercitationem quasi. <br /> In deleniti eaque aut repudiandae et a id nisi.</p>
					<button className="btn btn-primary">Get Started</button>
				</div>
			</div>
		</div>
	);
};

export default Banner;