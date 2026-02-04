import { ProfileForm, type FormValue } from '../ProfileForm';
import type { ProfileInfoProps } from './ProfileInfo.types';

import styles from './ProfileInfo.module.scss';

import { useEffect, useState, type SyntheticEvent } from 'react';

import {
	setCurrentUser,
	type ICurrentUser,
} from '../../../entities/user/model';

export const ProfileInfo = ({
	avatarUrl = 'https://placehold.co/160x160',
	user,
	cities,
}: ProfileInfoProps) => {
	const [isFormChanged, setIsFormChanged] = useState(false);
	const [error, setError] = useState({ email: null, name: null });
	const [formValue, setFormValue] = useState<FormValue>({
		email: '',
		name: '',
		avatar: '',
		cityId: undefined,
		dateOfBirth: '',
		gender: undefined,
		about: '',
	});

	useEffect(() => {
		setFormValue({
			email: user?.email || '',
			name: user?.name || '',
			avatar: user?.avatar || '',
			cityId: user?.cityId,
			dateOfBirth: user?.dateOfBirth || '',
			gender: user?.gender,
			about: user?.about || '',
		});
	}, [user]);

	useEffect(() => {
		setIsFormChanged(
			formValue.name !== user?.name ||
				formValue.email !== user?.email ||
				formValue.avatar !== user?.avatar ||
				formValue.cityId !== user?.cityId ||
				formValue.dateOfBirth !== user?.dateOfBirth ||
				formValue.gender !== user?.gender ||
				formValue.about !== user?.about,
		);
	}, [
		formValue.name,
		formValue.email,
		formValue.avatar,
		formValue.cityId,
		formValue.dateOfBirth,
		formValue.gender,
		formValue.about,
		user?.name,
		user?.email,
		user?.avatar,
		user?.cityId,
		user?.dateOfBirth,
		user?.gender,
		user?.about,
	]);

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		if (user) {
			const userData: ICurrentUser = {
				id: user.id,
				registrationDate: user.registrationDate,
				...formValue,
			};
			setCurrentUser(userData);
			setIsFormChanged(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormValue((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		if (
			(e.target.name === 'name' || e.target.name === 'email') &&
			e.target.value.trim().length == 0
		) {
			setError((prevState) => ({
				...prevState,
				[e.target.name]: 'Поле должно быть заполнено',
			}));
		} else {
			setError((prevState) => ({
				...prevState,
				[e.target.name]: null,
			}));
		}
	};

	const handleDateChange = (formattedDate: string) => {
		setFormValue((prevState) => ({
			...prevState,
			dateOfBirth: formattedDate,
		}));
	};

	const handleCityChange = (value: string) => {
		setFormValue((prevState) => ({
			...prevState,
			cityId: Number(value),
		}));
	};

	const handleGenderChange = (value: string) => {
		setFormValue((prevState) => ({
			...prevState,
			gender: value as 'male' | 'female' | undefined,
		}));
	};

	const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setFormValue((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<div className={styles.wrapper}>
			<ProfileForm
				profileFormData={formValue}
				handleSubmit={handleSubmit}
				handleDateChange={handleDateChange}
				handleInputChange={handleInputChange}
				handleCityChange={handleCityChange}
				handleGenderChange={handleGenderChange}
				handleTextAreaChange={handleTextAreaChange}
				cities={cities}
				isFormChanged={isFormChanged}
				error={error}
			/>

			<div className={styles['avatar-wrapper']}>
				<img
					src={user?.avatar || avatarUrl}
					alt="Аватар пользователя"
					className={styles.avatar}
				/>

				<button
					type="button"
					className={styles['edit-button']}
					aria-label="Изменить фото профиля"
				>
					✎
				</button>
			</div>
		</div>
	);
};
