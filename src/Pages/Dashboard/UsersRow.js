import React from 'react';

const UsersRow = ({ booking, index }) => {
	return (
		<tr>
			<th>{index + 1}</th>
			<td>{booking?.email}</td>
			<td><button className="btn btn-outline">Make a Admin</button></td>
			<td><button className="btn btn-outline btn-error">Remove User</button></td>
		</tr>
	);
};

export default UsersRow;