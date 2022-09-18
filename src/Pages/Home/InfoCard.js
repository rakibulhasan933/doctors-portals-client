import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/fontawesome-free-regular';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/fontawesome-free-solid';


const InfoCard = () => {
	return (
		<div className="grid grid-cols-1 gap-5 mx-6 lg:grid-cols-3">
			<div className="mx-2 bg-teal-100 shadow-xl card card-side">
				<figure className='px-4 '>
					<FontAwesomeIcon icon={faClock} size="4x" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Opening Hours</h2>
					<p>24/7 Hours</p>
				</div>
			</div>
			<div className="mx-2 shadow-xl card card-side bg-slate-300">
				<figure className='px-3 '>
					<FontAwesomeIcon icon={faLocationDot} size="4x" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Ours Locations</h2>
					<p>Bhurugamari, Kurigram 5670</p>
				</div>
			</div>
			<div className="mx-2 bg-teal-100 shadow-xl card card-side">
				<figure className='px-3 '>
					<FontAwesomeIcon icon={faPhone} size="4x" />
				</figure>
				<div className="card-body">
					<h2 className="card-title">Contacts Us</h2>
					<p>+8801700000000</p>
					<p>office@gmail.com</p>
				</div>
			</div>
		</div>
	);
};

export default InfoCard;