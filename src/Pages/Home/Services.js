import React from 'react';
import truth from '../../assets/images/whitening.png';
import Cavity from '../../assets/images/cavity.png';
import fluoride from '../../assets/images/fluoride.png';

const Services = () => {
	return (
		<div className='my-9'>
			<div className="py-5 text-center">
				<h5 className='pb-3 text-xl font-medium text-teal-400 uppercase'>Ours Services</h5>
				<h2 className='text-4xl'>Services We Provide</h2>
			</div>
			<div className="grid grid-cols-1 gap-5 mx-5 lg:grid-cols-3">
				<div className="shadow-xl card w-96 bg-base-100">
					<figure className="px-10 pt-10">
						<img src={truth} alt="Shoes" className="rounded-xl" />
					</figure>
					<div className="items-center text-center card-body">
						<h2 className="card-title">Truth Cleaning!</h2>
						<p>If a dog chews shoes whose shoes does he choose?</p>
					</div>
				</div>
				<div className="shadow-xl card w-96 bg-base-100">
					<figure className="px-10 pt-10">
						<img src={fluoride} alt="Shoes" className="rounded-xl" />
					</figure>
					<div className="items-center text-center card-body">
						<h2 className="card-title">fluoride!</h2>
						<p>If a dog chews shoes whose shoes does he choose?</p>
					</div>
				</div>
				<div className="shadow-xl card w-96 bg-base-100">
					<figure className="px-10 pt-10">
						<img src={Cavity} alt="Shoes" className="rounded-xl" />
					</figure>
					<div className="items-center text-center card-body">
						<h2 className="card-title">Cavity!</h2>
						<p>If a dog chews shoes whose shoes does he choose?</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Services;