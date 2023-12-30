import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from '../Home/Home.module.css';
//need to do an animation
const isSuccess = false;

interface IFormState {
	name: string;
	email: string;
}
function Home() {
	const { register, handleSubmit, reset } = useForm<IFormState>();
	const [isSuccess, setIsSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const onSubmit: SubmitHandler<IFormState> = (data) => {
		setIsLoading(true);
		fetch('http://localhost:5000/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => {
				res.json();
			})
			.then((data) => {
				if (data === null) return;
				setIsSuccess(true);
				reset();
			})
			.finally(() => setIsLoading(false));
	};
	return (
		<div className={styles.wrapper}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{isSuccess ? (
					<div className={styles.success}>Form has been sent</div>
				) : (
					<>
						<h1 className={'text-3xl font-bold '}>GTA 6 - Preorder now</h1>
						<input
							type='email'
							placeholder='Enter email...'
							{...register('email', {
								required: 'Field is empty',
							})}
						/>
						<input
							type='text'
							placeholder='Enter name...'
							{...register('name', {
								required: 'Field is empty',
							})}
						/>
						<button disabled={isLoading} className={styles.button}>
							{isLoading ? 'Loading...' : 'Want GTA 6'}
						</button>
					</>
				)}
			</form>
		</div>
	);
}

export default Home;
