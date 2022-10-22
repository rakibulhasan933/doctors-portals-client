import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const ManageDoctor = () => {
	const { data: doctors, isLoading } = useQuery('doctors', () => fetch('http://localhost:5000/doctors', {
		headers: {
			authorization: `Bearer ${localStorage.getItem('accessToken')}`
		}
	}).then(res => res.json()));
	if (isLoading) {
		return <Loading />
	}
	console.log(doctors);
	return (
		<div>
			<h1 className='text-2xl '>Manage Doctor :{doctors.length}</h1>
			<div className="w-full overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Specialty</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{
							doctors?.map(doctor =>
								<tr>
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
										<button className="btn btn-ghost btn-xs">details</button>
									</th>
								</tr>
							)
						}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ManageDoctor;