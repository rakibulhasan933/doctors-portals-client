import React from 'react';
import { toast } from 'react-toastify';

const Doctor = ({ doctor, index, refetch }) => {

	const handleDoctorRemove = () => {
		fetch(`http://localhost:5000/doctor-remove/${doctor._id}`, {
			method: 'DELETE',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log('deleted', data);
				if (data.deletedCount) {
					toast.success('Doctor Deleted successfully');
					refetch();
				}

				else {
					toast.error('Failed Deleted Doctor')
				}
			})
	}
	return (
		<tr>
			<td>{index + 1}</td>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="w-12 h-12 mask mask-squircle">
							<img src={doctor.img} alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
					<div>
						<div className="font-bold">{doctor.name}</div>
						<div className="text-sm opacity-50">United States</div>
					</div>
				</div>
			</td>
			<td>
				{doctor.email}
				<br />
				<span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
			</td>
			<td>{doctor.specialty}</td>
			<th>
				<button onClick={() => handleDoctorRemove(doctor?._id)} className="btn btn-error btn-xs">Deleted</button>
			</th>
		</tr>
	);
};

export default Doctor;