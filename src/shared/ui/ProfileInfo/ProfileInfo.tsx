import { ProfileForm, type FormValue } from '../ProfileForm';
import type { ProfileInfoProps } from './ProfileInfo.types';

import styles from './ProfileInfo.module.scss';

import { useEffect, useRef, useState, type SyntheticEvent } from 'react';

import {
	setCurrentUser,
	type ICurrentUser,
} from '../../../entities/user/model';

import galleryEditIcon from '../../assets/icons/gallery-edit.svg';

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

	const fileInputRef = useRef<HTMLInputElement>(null);

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

	const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		// Проверка типа файла
		if (!file.type.startsWith('image/')) {
			alert('Пожалуйста, выберите изображение (JPEG, PNG, GIF)');
			return;
		}

		// Проверка размера (5MB максимум)
		if (file.size > 5 * 1024 * 1024) {
			alert('Размер файла не должен превышать 5MB');
			return;
		}

		// Создание Data URL для предпросмотра
		const reader = new FileReader();
		reader.onload = (event) => {
			const imageUrl = event.target?.result as string;

			// ТОЛЬКО обновляем состояние формы для предпросмотра
			// НЕ сохраняем в localStorage!
			setFormValue((prevState) => ({
				...prevState,
				avatar: imageUrl,
			}));
		};
		reader.onerror = () => {
			alert('Ошибка при чтении файла');
		};
		reader.readAsDataURL(file);
	};

	const triggerFileInput = () => {
		fileInputRef.current?.click();
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
					src={formValue.avatar || user?.avatar || avatarUrl}
					alt="Аватар пользователя"
					className={styles.avatar}
				/>

				{/* Скрытый input для загрузки файла */}
				<input
					type="file"
					ref={fileInputRef}
					accept="image/*"
					onChange={handleAvatarChange}
					style={{ display: 'none' }}
				/>

				<button
					type="button"
					className={styles['edit-button']}
					onClick={triggerFileInput}
					aria-label="Изменить фото профиля"
				>
					<img src={galleryEditIcon} alt="" className={styles['edit-icon']} />
				</button>
			</div>
		</div>
	);
};
