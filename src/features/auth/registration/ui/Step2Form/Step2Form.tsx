import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BirthDatePicker } from '../../../../../shared/ui/BirthDatePicker';
import { Button } from '../../../../../shared/ui/Button';
import { DropDown } from '../../../../../shared/ui/DropDown';
import { InputField } from '../../../../../shared/ui/InputField';
import cls from './Step2Form.module.scss';
import type { Step2FormProps } from './Step2Form.types';
import { useStep2Form } from './useStep2Form';
import { getUserDraft } from '../../../../../entities/user/model/storageUtils';

export const Step2Form = ({ className = '' }: Step2FormProps) => {
	const navigate = useNavigate();
	const [hasAccess, setHasAccess] = useState(false);

	const {
		formData,
		avatarPreview,
		errors,
		openDropdown,
		cities,
		categories,
		filteredSubcategories,
		handleFieldChange,
		handleAvatarChange,
		handleDropdownToggle,
		handleSubmit,
		handleBack,
		isFormValid,
		handleNameBlur,
	} = useStep2Form();

	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleAvatarClick = () => {
		fileInputRef.current?.click();
	};

	useEffect(() => {
		const userDraft = getUserDraft();
		if (userDraft?.email && userDraft?.password) {
			setHasAccess(true);
		} else {
			navigate('/registration/step1', { replace: true });
		}
	}, [navigate]);

	if (!hasAccess) {
		return null;
	}

	return (
		<form className={`${cls.form} ${className}`} onSubmit={handleSubmit}>
			<div className={cls['avatar-wrapper']}>
				<div className={cls['avatar-container']} onClick={handleAvatarClick}>
					{avatarPreview ? (
						<img
							src={avatarPreview}
							alt="Аватар профиля"
							className={cls['avatar-image']}
						/>
					) : (
						<svg
							width="72"
							height="72"
							viewBox="0 0 56 56"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							className={cls['default-avatar-icon']}
						>
							<path
								d="M45.6945 47.9241C43.598 45.1491 40.8859 42.8986 37.7717 41.3499C34.6576 39.8011 31.2265 38.9964 27.7485 38.9991C24.2705 38.9964 20.8394 39.8011 17.7253 41.3499C14.6111 42.8986 11.899 45.1491 9.80251 47.9241M45.6945 47.9241C49.785 44.2857 52.6729 39.4898 53.9751 34.1724C55.2773 28.855 54.9323 23.2674 52.9859 18.1505C51.0395 13.0337 47.5837 8.62944 43.0767 5.52181C38.5697 2.41417 33.2245 0.75 27.75 0.75C22.2755 0.75 16.9303 2.41417 12.4233 5.52181C7.91633 8.62944 4.46049 13.0337 2.51411 18.1505C0.567724 23.2674 0.222759 28.855 1.52496 34.1724C2.82716 39.4898 5.712 44.2857 9.80251 47.9241M45.6945 47.9241C40.756 52.3277 34.3652 54.7574 27.7485 54.7491C21.1308 54.7581 14.7418 52.3284 9.80251 47.9241M36.7485 20.9991C36.7485 23.3861 35.8003 25.6753 34.1125 27.3631C32.4246 29.0509 30.1355 29.9991 27.7485 29.9991C25.3616 29.9991 23.0724 29.0509 21.3845 27.3631C19.6967 25.6753 18.7485 23.3861 18.7485 20.9991C18.7485 18.6122 19.6967 16.323 21.3845 14.6352C23.0724 12.9473 25.3616 11.9991 27.7485 11.9991C30.1355 11.9991 32.4246 12.9473 34.1125 14.6352C35.8003 16.323 36.7485 18.6122 36.7485 20.9991Z"
								stroke="#253017"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
					<div className={cls['plus-badge']}>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
								fill="white"
							/>
							<path
								d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
								fill="white"
							/>
						</svg>
					</div>
				</div>
				<input
					type="file"
					accept="image/*"
					ref={fileInputRef}
					onChange={handleAvatarChange}
					style={{ display: 'none' }}
				/>
			</div>

			<div className={cls.fields}>
				<InputField
					label="Имя"
					placeholder="Введите ваше имя"
					value={formData.name}
					onChange={(e) => handleFieldChange('name')(e.target.value)}
					onBlur={handleNameBlur}
					required={true}
					error={!!errors.name}
					errorText={errors.name}
					id="name-input"
				/>
				<div className={cls['inline-fields']}>
					<div className={cls['inline-field']}>
						<BirthDatePicker
							value={formData.birthDate}
							onChange={handleFieldChange('birthDate')}
						/>
					</div>
					<div className={cls['inline-field']}>
						<label className={cls['dropdown-label']}>Пол</label>
						<div
							ref={(el) => {
								dropdownRefs.current.gender = el;
							}}
							onClick={() => handleDropdownToggle('gender')}
						>
							<DropDown
								options={[
									{ value: 'male', label: 'Мужской' },
									{ value: 'female', label: 'Женский' },
									{ value: 'unspecified', label: 'Не указан' },
								]}
								value={formData.gender}
								onChange={handleFieldChange('gender')}
								placeholder="Не указан"
								label=""
								isOpen={openDropdown === 'gender'}
								onToggle={() => handleDropdownToggle('gender')}
							/>
						</div>
					</div>
				</div>
				<div className={cls['dropdown-field']}>
					<label className={cls['dropdown-label']}>Город</label>
					<div
						ref={(el) => {
							dropdownRefs.current.city = el;
						}}
						onClick={() => handleDropdownToggle('city')}
					>
						<DropDown
							options={cities.map((city) => ({
								value: city.id.toString(),
								label: city.name,
							}))}
							value={formData.cityId}
							onChange={handleFieldChange('cityId')}
							placeholder="Не указан"
							label=""
							isOpen={openDropdown === 'city'}
							onToggle={() => handleDropdownToggle('city')}
						/>
					</div>
				</div>
				<div className={cls['dropdown-field']}>
					<label className={cls['dropdown-label']}>
						Категория навыка, которому хотите научиться
					</label>
					<div
						ref={(el) => {
							dropdownRefs.current.skillCategory = el;
						}}
						onClick={() => handleDropdownToggle('skillCategory')}
					>
						<DropDown
							options={categories.map((cat) => ({
								value: cat.id.toString(),
								label: cat.name,
							}))}
							value={formData.learnCategoryId}
							onChange={handleFieldChange('learnCategoryId')}
							placeholder="Выберите категорию"
							label=""
							isOpen={openDropdown === 'skillCategory'}
							onToggle={() => handleDropdownToggle('skillCategory')}
						/>
					</div>
				</div>
				<div className={cls['dropdown-field']}>
					<label className={cls['dropdown-label']}>
						Подкатегория навыка, которому хотите научиться
					</label>
					<div
						ref={(el) => {
							dropdownRefs.current.skillSubcategory = el;
						}}
						onClick={() => handleDropdownToggle('skillSubcategory')}
					>
						<DropDown
							options={filteredSubcategories.map((sub) => ({
								value: sub.id.toString(),
								label: sub.name,
							}))}
							value={formData.learnSubcategoryId}
							onChange={handleFieldChange('learnSubcategoryId')}
							placeholder="Выберите подкатегорию"
							label=""
							isOpen={openDropdown === 'skillSubcategory'}
							onToggle={() => handleDropdownToggle('skillSubcategory')}
						/>
					</div>
				</div>
			</div>

			<div className={cls.buttons}>
				<Button
					type="button"
					variant="secondary"
					onClick={handleBack}
					className={cls['button-back']}
				>
					Назад
				</Button>
				<Button
					type="submit"
					variant="primary"
					disabled={!isFormValid}
					className={cls['button-continue']}
				>
					Продолжить
				</Button>
			</div>
		</form>
	);
};
