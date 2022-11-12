import React from 'react';
import { toast } from 'react-toastify';

const UsersRow = ({ user, index, refetch }) => {
	const { email, role, _id } = user;

	const makeAdmin = () => {
		fetch(`https://doctors-portal-server-tau.vercel.app/user/admin/${email}`, {
			method: 'PUT',
			headers: {
				authorization: `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => {
				if (res.status === 403) {
					toast.error('Failed to Make a Admin');
				}
				return res.json()
			})
			.then(data => {
				if (data.modifiedCount > 0) {
					refetch();
					toast.success(`Successfully made an Admin ${email}`)
				}
			})
	};
	const handleDoctorRemove = () => {
		fetch(`https://doctors-portal-server-tau.vercel.app/user-remove/${_id}`, {
			method: 'DELETE',
			headers: {
				'authorization': `Bearer ${localStorage.getItem('accessToken')}`
			}
		})
			.then(res => res.json())
			.then(data => {
				if (data.deletedCount) {
					toast.success('User Deleted successfully');
					refetch();
				}

				else {
					toast.error('Failed Deleted User')
				}
			})
	}
	return (
		<tr>
			<th>{index + 1}</th>
			<td>{email}</td>
			<td>{role ? <h2 className='font-bold text-green-400 uppercase' >Admin</h2> : <button onClick={makeAdmin} className="btn btn-outline">Make a Admin</button>}</td>
			<td><button onClick={() => handleDoctorRemove(_id)} className="btn btn-outline btn-error">Remove User</button></td>
		</tr>
	);
};

export default UsersRow;