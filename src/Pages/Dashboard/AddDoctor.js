import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
	const { register, handleSubmit, formState: { errors } } = useForm();
	const { data: services, isLoading } = useQuery('services', () => fetch('http://localhost:5000/services').then(res => res.json()));
	if (isLoading) {
		return <Loading />
	}
	const onSubmit = async (data) => {
		console.log(data);
		toast('Your Registration Successfully, Send email verification user');
	};
	return (
		<div>
			<h1 className='text-2xl'>Add Doctor</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="w-full max-w-xs form-control">
					<label className="label">
						<span className="label-text">Name</span>
					</label>
					<input type="text" placeholder='name' className="w-full max-w-xs input input-bordered" {...register("name", {
						required: {
							value: true,
							message: 'Name is Required'
						}
					})} />
					<label className="label">
						{errors.name?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.name?.message}</span>}
					</label>
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input type="email" placeholder='example@gmail.com' className="w-full max-w-xs input input-bordered" {...register("email", {
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
						{errors.email?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.email?.message}</span>}
						{errors.email?.type === 'pattern' && <span className="text-red-500 label-text-alt">{errors.email?.message}</span>}
					</label>
					<label className="label">
						<span className="label-text">Specialty</span>
					</label>
					<select {...register("specialty")} className="w-full max-w-xs select">
						{
							services?.map(service => <option key={service?._id} value={service.name}>{service.name}</option>)
						}
					</select>
				</div>
				<input className='w-full max-w-xs text-white btn' type="submit" value="Add Doctor" />
			</form>
		</div>
	);
};

export default AddDoctor;