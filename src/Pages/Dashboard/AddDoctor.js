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

	const ImageStorageKey = '653e47c04775bf54b071a6f09142d5a0';

	const onSubmit = async (data) => {
		const image = data.image[0];
		const formData = new FormData();
		formData.append('image', image);
		const url = `https://api.imgbb.com/1/upload?key=${ImageStorageKey}`;
		fetch(url, {
			method: 'POST',
			body: formData
		})
			.then(res => res.json())
			.then(result => {
				if (result.success) {
					const img = result.data.url;
					const doctor = {
						name: data.name,
						email: data.email,
						specialty: data.specialty,
						img: img
					}
					console.log(doctor);
					// POST DOCTOR DATA
				}
			})
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
					<label className="label">
						<span className="label-text">Photo Upload</span>
					</label>
					<input type="file" className="w-full max-w-xs input" {...register("image", {
						required: {
							value: true,
							message: 'Image is Required'
						}
					})} />
					<label className="label">
						{errors.image?.type === 'required' && <span className="text-red-500 label-text-alt">{errors.image?.message}</span>}
					</label>
				</div>
				<input className='w-full max-w-xs text-white btn' type="submit" value="Add Doctor" />
			</form>
		</div>
	);
};

export default AddDoctor;