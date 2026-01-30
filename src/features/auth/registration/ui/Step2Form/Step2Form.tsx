import { useRef, useState } from 'react';
import { BirthDatePicker } from '../../../../../shared/ui/BirthDatePicker';
import { Button } from '../../../../../shared/ui/Button';
import { DropDown } from '../../../../../shared/ui/DropDown';
import { InputField } from '../../../../../shared/ui/InputField';
import cls from './Step2Form.module.scss';
import type { Step2FormProps } from './Step2Form.types';

export const Step2Form = ({ className = '' }: Step2FormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		birthDate: '' as string,
		gender: '',
		city: '',
		skillCategory: '',
		skillSubcategory: '',
	});

	const [errors, setErrors] = useState({ name: '' });
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const handleInputChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value,
			}));

			if (errors.name && field === 'name') {
				setErrors((prev) => ({ ...prev, name: '' }));
			}
		};

	const handleDropdownChange =
		(field: keyof typeof formData) => (value: string) => {
			setFormData((prev) => ({
				...prev,
				[field]: value,
			}));
			setOpenDropdown(null);
		};

	const handleDropdownToggle = (field: string) => {
		setOpenDropdown(openDropdown === field ? null : field);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors = {
			name: formData.name ? '' : 'Имя обязательно для заполнения',
		};
		setErrors(newErrors);
		if (newErrors.name) return;

		console.log('Step 2 form submitted:', formData);
		// здесь будет реальный submit / переход на следующий шаг
	};

	const handleBackClick = () => {
		console.log('Back button clicked');
		// здесь будет логика возврата на предыдущий шаг
	};

	return (
		<form className={`${cls.form} ${className}`} onSubmit={handleSubmit}>
			<div className={cls.fields}>
				<InputField
					label="Имя"
					placeholder="Введите ваше имя"
					value={formData.name}
					onChange={handleInputChange('name')}
					required={true}
					error={!!errors.name}
					errorText={errors.name}
					id="name-input"
				/>

				<div className={cls['inline-fields']}>
					<div className={cls['inline-field']}>
						<BirthDatePicker
							value={formData.birthDate}
							onChange={(formatted) =>
								setFormData((prev) => ({ ...prev, birthDate: formatted }))
							}
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
								options={[]}
								value={formData.gender}
								onChange={handleDropdownChange('gender')}
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
							options={[]}
							value={formData.city}
							onChange={handleDropdownChange('city')}
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
							options={[]}
							value={formData.skillCategory}
							onChange={handleDropdownChange('skillCategory')}
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
							options={[]}
							value={formData.skillSubcategory}
							onChange={handleDropdownChange('skillSubcategory')}
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
					onClick={handleBackClick}
					className={cls['button-back']}
				>
					Назад
				</Button>

				<Button
					type="submit"
					variant="primary"
					className={cls['button-continue']}
				>
					Продолжить
				</Button>
			</div>
		</form>
	);
};
