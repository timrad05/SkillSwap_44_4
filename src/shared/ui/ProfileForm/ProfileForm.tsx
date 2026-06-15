import { useEffect, useState, type FC } from 'react';
import { BirthDatePicker } from '../BirthDatePicker';
import { Button } from '../Button';
import { DropDown } from '../DropDown';
import { InputField } from '../InputField';
import { Textarea } from '../Textarea';
import styles from './ProfileForm.module.scss';
import type { ProfileFormProps } from './ProfileForm.types';
import { PasswordEditModal } from '../../../widgets/PasswordEditModal';

export const ProfileForm: FC<ProfileFormProps> = ({
	profileFormData,
	handleSubmit,
	handleDateChange,
	handleInputChange,
	handleCityChange,
	handleGenderChange,
	handleTextAreaChange,
	handlePasswordChange,
	error,
	cities,
	isFormChanged,
}) => {
	const [citiesValue, setCitiesValue] = useState<
		{ value: string; label: string }[]
	>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleSavePassword = (newPassword: string): void => {
		console.log('Новый пароль:', newPassword);
		handlePasswordChange(newPassword);
		setIsModalOpen(false);
	};

	useEffect(() => {
		setCitiesValue(
			cities?.map((c) => {
				return { value: c.id.toString(), label: c.name };
			}) || [],
		);
	}, [cities]);

	return (
		<>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.block}>
					<InputField
						name={'email'}
						type="email"
						label="Почта"
						value={profileFormData.email}
						variant="change"
						onChange={handleInputChange}
						required={true}
						error={error['email'] != null}
						errorText={error['email'] || ''}
					/>
					<button
						type="button"
						className={styles['password-link']}
						onClick={() => setIsModalOpen(true)}
					>
						Изменить пароль
					</button>
				</div>
				<InputField
					label="Имя"
					name={'name'}
					value={profileFormData.name}
					variant="change"
					required={true}
					onChange={handleInputChange}
					error={error['name'] != null}
					errorText={error['name'] || ''}
				/>
				<div className={styles.row}>
					<BirthDatePicker
						label="Дата рождения"
						value={profileFormData.dateOfBirth}
						onChange={handleDateChange}
						placeholder="дд.мм.гггг"
						className={styles['custom-date-picker']}
					/>
					<DropDown
						label="Пол"
						value={profileFormData.gender}
						options={[
							{ value: 'female', label: 'Женский' },
							{ value: 'male', label: 'Мужской' },
						]}
						onChange={handleGenderChange}
					/>
				</div>
				<DropDown
					label="Город"
					value={profileFormData.cityId?.toString()}
					options={citiesValue}
					onChange={handleCityChange}
				/>
				<Textarea
					name={'about'}
					label="О себе"
					value={profileFormData.about}
					onChange={handleTextAreaChange}
					showIcon
				/>
				<Button
					disabled={
						!isFormChanged || error['name'] != null || error['email'] != null
					}
					type="submit"
				>
					Сохранить
				</Button>
			</form>

			<PasswordEditModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSave={handleSavePassword}
			/>
		</>
	);
};
