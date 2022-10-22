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
			<h1>Manage Doctor :{doctors.length}</h1>
		</div>
	);
};

export default ManageDoctor;