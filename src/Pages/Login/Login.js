import React, { useEffect } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useForm } from "react-hook-form";
import Loading from '../Shared/Loading';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';


const Login = () => {
	const [
		signInWithEmailAndPassword, ,
		user,
		loading,
		error,
	] = useSignInWithEmailAndPassword(auth);
	const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

	const [token] = useToken(user || gUser)

	const { register, handleSubmit, formState: { errors } } = useForm();
	const onSubmit = data => {
		signInWithEmailAndPassword(data.email, data.password)
	};
	const navigate = useNavigate();
	const location = useLocation();

	let from = location?.state?.from?.pathname || '/';

	useEffect(() => {
		if (token) {
			navigate(from, { replace: true });
		}
	}, [token, from, navigate]);

	const handleForgetPassword = () => {
		navigate('/forget_password');
	};

	let signInError;

	if (loading || gLoading) {
		return <Loading />
	};
	if (gError || error) {
		signInError = <p className='mb-2 text-center text-red-500'><small>{error?.message || gError?.message}</small> </p>
	}


	return (
		<div className='flex items-center justify-center h-screen'>
			<div className="shadow-xl card w-96 bg-base-100 ">
				<div className="card-body">
					<h2 className="mb-3 text-2xl font-bold text-center">Login</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="w-full max-w-xs form-control">
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input type="email" className="w-full max-w-xs input input-bordered" {...register("email", {
								required: {
									value: true,
									message: 'Email is Required'
								},
								pattern: {
									value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
									message: 'Provide a valid Email'
								}
							})} />
							<label className="label">
								{errors.email?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.email.message}</span>}
								{errors.email?.type === 'pattern' && <span className="text-red-500 label-text-alt">{errors.email.message}</span>}
							</label>
							<label className="label">
								<span className="label-text">Password</span>
							</label>
							<input type="password" className="w-full max-w-xs input input-bordered" {...register("password", {
								required: {
									value: true,
									message: 'Password is Required'
								},
								minLength: {
									value: 6,
									message: 'Must be 6 characters or longer'
								}
							})} />
							<label className="label">
								{errors.password?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.password.message}</span>}
								{errors.password?.type === 'minLength' && <span className="text-red-500 label-text-alt">{errors.password.message}</span>}
								<p className="text-sm cursor-pointer label-text-alt text-cyan-300 text-end" onClick={handleForgetPassword} >Forget Password ?</p>
							</label>
						</div>
						{signInError}
						<input className='w-full max-w-xs text-white btn' type="submit" value="Login" />
					</form>
					<p className='text-center'><small>New to Doctor portal <Link to='/signup' className='text-green-400 '>Create account</Link> </small></p>
					<div className="divider">OR</div>
					<button onClick={() => signInWithGoogle()} className="mb-2 btn btn-outline">Continue with Google</button>
				</div>
			</div>
		</div>
	);
};

export default Login;