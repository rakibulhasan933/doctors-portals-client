import React from 'react';

const Login = () => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className="shadow-xl card w-96 bg-base-100 ">
				<div className="card-body">
					<h2 className="mb-3 text-2xl font-bold text-center">Login</h2>
					<form>
						<input type="email" placeholder="your email" className="w-full max-w-xs mb-3 input input-bordered" required />
						<input type="password" placeholder="your password" className="w-full max-w-xs mb-3 input input-bordered" required />
						<input type="submit" value="Submit" className="w-full max-w-xs text-lg font-bold input input-bordered bg-cyan-300" />
					</form>
					<div className="divider">OR</div>
					<button className="mb-2 btn btn-outline">Continue with Google</button>
				</div>
			</div>
		</div>
	);
};

export default Login;