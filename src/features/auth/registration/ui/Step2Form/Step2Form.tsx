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
		errors,
		openDropdown,
		cities,
		categories,
		filteredSubcategories,
		handleFieldChange,
		handleDropdownToggle,
		handleSubmit,
		handleBack,
		isFormValid,
		handleNameBlur,
	} = useStep2Form();

	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

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
