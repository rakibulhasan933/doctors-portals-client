import React from 'react';
import Banner from './Banner';
import InfoCard from './InfoCard';
import MakeAppointment from './MakeAppointment';
import Services from './Services';
import Testimonials from './Testimonials';
import Treatment from './Treatment';

const Home = () => {
	return (
		<div>
			<Banner />
			<InfoCard />
			<Services />
			<Treatment />
			<MakeAppointment />
			<Testimonials />
		</div>
	);
};

export default Home;