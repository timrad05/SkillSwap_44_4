// Step2Form.tsx
import { useState, useRef, useEffect } from 'react';
import type { Step2FormProps } from './Step2Form.types';
import { InputField } from '../../../../shared/ui/InputField';
import { DropDown } from '../../../../shared/ui/DropDown';
import { Button } from '../../../../shared/ui/Button';
import cls from './Step2Form.module.scss';

export const Step2Form = ({ className = '' }: Step2FormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		birthDate: '',
		gender: '',
		city: '',
		skillCategory: '',
		skillSubcategory: '',
	});

	const [errors, setErrors] = useState({
		name: '',
	});

	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (openDropdown && dropdownRefs.current[openDropdown]) {
				const dropdownElement = dropdownRefs.current[openDropdown];
				if (
					dropdownElement &&
					!dropdownElement.contains(event.target as Node)
				) {
					setOpenDropdown(null);
				}
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [openDropdown]);

	const handleInputChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value,
			}));

			if (errors.name && field === 'name') {
				setErrors((prev) => ({
					...prev,
					name: '',
				}));
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
		if (openDropdown === field) {
			setOpenDropdown(null);
		} else {
			setOpenDropdown(field);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = {
			name: formData.name ? '' : 'Имя обязательно для заполнения',
		};

		setErrors(newErrors);

		if (newErrors.name) {
			return;
		}

		// Тут будет логика отправки формы
		console.log('Step 2 form submitted:', formData);
	};

	const handleBackClick = () => {
		console.log('Back button clicked');
		// Тут будет переход на предыдущий шаг
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
					{/* Дата рождения */}
					<div className={cls['inline-field']}>
						<label className={cls['dropdown-label']}>Дата рождения</label>
						<div
							ref={(el) => {
								dropdownRefs.current.birthDate = el;
							}}
							onClick={() => handleDropdownToggle('birthDate')}
						>
							<DropDown
								options={[]}
								value={formData.birthDate}
								onChange={handleDropdownChange('birthDate')}
								placeholder="ДД.ММ.ГГГГ"
								label=""
								isOpen={openDropdown === 'birthDate'}
								onToggle={() => handleDropdownToggle('birthDate')}
							/>
						</div>
					</div>

					{/* Пол */}
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
