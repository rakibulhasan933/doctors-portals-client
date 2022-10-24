import React from 'react';

const Doctor = ({ doctor, index, setDeleteDoctor }) => {

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
				<label onClick={() => setDeleteDoctor(doctor)} htmlFor="delete-doctor-modal" className="btn btn-error btn-xs">Delete</label>
			</th>
		</tr>
	);
};

export default Doctor;