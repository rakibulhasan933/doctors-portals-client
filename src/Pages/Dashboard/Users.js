import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UsersRow from './UsersRow';

const Users = () => {
	const { data: users, isLoading, refetch } = useQuery(['users'], () => fetch('https://doctors-portal-server-tau.vercel.app/users', {
		method: 'GET',
		headers: {
			authorization: `Bearer ${localStorage.getItem('accessToken')}`
		}
	})
		.then(res => res.json()))

	if (isLoading) {
		return <Loading />
	}
	return (
		<div className="overflow-x-auto">
			<table className="table w-full">
				<thead>
					<tr>
						<th></th>
						<th>Email</th>
						<th>Status</th>
						<th>Account</th>
					</tr>
				</thead>
				<tbody>
					{
						users?.map((user, index) => <UsersRow key={user._id} user={user} refetch={refetch} index={index} ></UsersRow>)
					}
				</tbody>
			</table>
		</div>
	);
};

export default Users;