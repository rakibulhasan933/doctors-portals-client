import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UsersRow from './UsersRow';

const Users = () => {
	const { data: users, isLoading } = useQuery(['users'], () => fetch('http://localhost:5000/users')
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
						<th>Name</th>
						<th>Email</th>
						<th>Deleted Account</th>
					</tr>
				</thead>
				<tbody>
					{
						users.map((booking, index) => <UsersRow key={booking._id} booking={booking} index={index} ></UsersRow>)
					}
				</tbody>
			</table>
		</div>
	);
};

export default Users;