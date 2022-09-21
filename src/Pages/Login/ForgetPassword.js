import React, { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';

const ForgetPassword = () => {
	const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
	const [email, setEmail] = useState('');

	const navigate = useNavigate();

	const sendPasswordReset = async () => {
		await sendPasswordResetEmail(email)
		alert('send email');
		navigate('/login');
	};
	if (sending) {
		return <Loading />
	};

	return (
		<div className='flex items-center justify-center h-screen '>
			<div className="flex items-center justify-center w-2/4 shadow-xl card bg-base-100">
				<div className="card-body">
					<h2 className='text-2xl font-bold text-center'>Forget Password</h2>
					<div className="mb-3 form-control">
						<label className="label">
							<span className="label-text">Your Email</span>
						</label>
						<label className="input-group">
							<span>Email</span>
							<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@site.com" className="w-full input input-bordered" />
						</label>
					</div>
					<div className="justify-center card-actions">
						<button className="btn btn-primary" onClick={sendPasswordReset} >Sent Email </button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgetPassword;