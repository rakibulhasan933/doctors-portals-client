import React from 'react';

const UsersRow = ({ booking, index }) => {
	return (
		<tr>
			<th>{index + 1}</th>
			<td>{booking?.email}</td>
			<td>Quality Control Specialist</td>
			<td>Blue</td>
		</tr>
	);
};

export default UsersRow;