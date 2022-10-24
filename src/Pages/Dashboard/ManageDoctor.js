import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DeleteDoctorModal from './DeleteDoctorModal';
import Doctor from './Doctor';

const ManageDoctor = () => {

	const [deleteDoctor, setDeleteDoctor] = useState(null);
	const { data: doctors, isLoading, refetch } = useQuery('doctors', () => fetch('http://localhost:5000/doctors', {
		headers: {
			authorization: `Bearer ${localStorage.getItem('accessToken')}`
		}
	}).then(res => res.json()));
	if (isLoading) {
		return <Loading />
	}
	// console.log(doctors);
	return (
		<div>
			<h1 className='text-2xl '>Manage Doctor :{doctors.length}</h1>
			<div className="w-full overflow-x-auto">
				<table className="table w-full">
					<thead>
						<tr><th></th>
							<th>Name</th>
							<th>Email</th>
							<th>Specialty</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{
							doctors?.map((doctor, index) => <Doctor key={doctor?._id} setDeleteDoctor={setDeleteDoctor} doctor={doctor} index={index} />)
						}
					</tbody>
				</table>
			</div>
			{deleteDoctor && <DeleteDoctorModal
				setDeleteDoctor={setDeleteDoctor}
				deleteDoctor={deleteDoctor}
				refetch={refetch}
			></DeleteDoctorModal>}
		</div>
	);
};

export default ManageDoctor;