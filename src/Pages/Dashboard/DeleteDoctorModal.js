import React from 'react';
import { toast } from 'react-toastify';

const DeleteDoctorModal = ({ deleteDoctor, setDeleteDoctor, refetch }) => {
	const { name, email, _id } = deleteDoctor;
	const handleDoctorRemove = () => {
		fetch(`https://doctors-portal-server-tau.vercel.app/doctor-remove/${_id}`, {
			method: 'DELETE',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.deletedCount) {
					toast.success('Doctor Deleted successfully');
					refetch();
					setDeleteDoctor(null);
				}

				else {
					toast.error('Failed Deleted Doctor')
				}
			})
	}
	return (
		<div>
			<input type="checkbox" id="delete-doctor-modal" className="modal-toggle" />
			<div className="modal modal-bottom sm:modal-middle">
				<div className="text-center modal-box">
					<h3 className="text-lg font-bold text-red-600">{name}</h3>
					<h3 className="text-lg font-bold text-blue-600">{email}</h3>
					<p className="py-4">Are you sure you want to delete doctor profile ?</p>
					<div className="modal-action">
						<button onClick={() => handleDoctorRemove(_id)} className="mr-5 btn btn-error">Deleted</button>
						<label htmlFor="delete-doctor-modal" className="justify-center bg-green-700 btn">Cancel</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteDoctorModal;