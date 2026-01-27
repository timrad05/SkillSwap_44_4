import React, { useEffect, useRef, useState } from 'react';
import type { Step3FormProps } from './Step3Form.types';
import clsx from 'clsx';
import styles from './Step3Form.module.scss';
import { InputField } from '../../../../../shared/ui/InputField';
import { DropDown } from '../../../../../shared/ui/DropDown';
import type { DropDownOption } from '../../../../../shared/ui/DropDown/DropDown.types';
import { Textarea } from '../../../../../shared/ui/Textarea';
import { Button } from '../../../../../shared/ui/Button';

export const Step3Form = ({ className = '' }: Step3FormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		category: '',
		subcategory: '',
		description: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		category: '',
		subcategory: '',
	});

	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});

	const categories: DropDownOption[] = [
		{
			value: '1',
			label: 'Бизнес и карьера',
		},
		{
			value: '2',
			label: 'Творчество и искусство',
		},
	];

	const subcategories: DropDownOption[] = [
		{
			value: '1',
			label: 'Рисование и иллюстрация',
		},
		{
			value: '2',
			label: 'Фотография',
		},
	];

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
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value,
			}));
			if (errors.name) {
				setErrors((prev) => ({
					...prev,
					[field]: e.target.value,
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

	const handleDropdownTogle = (field: keyof typeof formData) => {
		if (openDropdown === field) {
			setOpenDropdown(null);
		} else {
			setOpenDropdown(field);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors = {
			name: formData.name ? '' : 'Поле обязательное для заполнения',
			category: formData.category ? '' : 'Поле обязательное для заполнения',
			subcategory: formData.subcategory
				? ''
				: 'Поле обязательное для заполнения',
		};

		setErrors(newErrors);

		if (newErrors.name || newErrors.category || newErrors.subcategory) {
			return;
		}

		// Тут будет логика отправки формы
		console.log('Step 3 form submitted:', formData);
	};

	const handleBackClick = () => {
		console.log('Back button clicked');
		// Тут будет переход на предыдущий шаг
	};

	return (
		<form className={clsx(styles.form, className)} onSubmit={handleSubmit}>
			<div className={styles.fields}>
				<InputField
					label="Название навыка"
					placeholder="Введите название вашего навыка"
					value={formData.name}
					onChange={handleInputChange('name')}
					required={true}
					error={!!errors.name}
					errorText={errors.name}
					id="skillName-input"
				/>
			</div>
			<div className={styles['dropdown-field']}>
				<DropDown
					options={categories}
					label="Категория навыка"
					placeholder="Выберите категорию навыка"
					value={formData.category}
					onChange={handleDropdownChange('category')}
					isOpen={openDropdown === 'category'}
					required={true}
					onToggle={() => handleDropdownTogle('category')}
				/>
			</div>
			<div className={styles['dropdown-field']}>
				<DropDown
					options={subcategories}
					label="Подкатегория навыка"
					placeholder="Выберите подкатегорию навыка"
					value={formData.subcategory}
					onChange={handleDropdownChange('subcategory')}
					isOpen={openDropdown === 'subcategory'}
					required={true}
					onToggle={() => handleDropdownTogle('subcategory')}
				/>
			</div>
			<div className={styles['textarea-field']}>
				<Textarea
					label="Описание"
					placeholder="Коротко опишите, чему можете научить"
					value={formData.description}
					onChange={handleInputChange('description')}
					required={false}
					id="skillName-input"
				/>
			</div>
			<div className={clsx(styles.buttons)}>
				<Button type="button" variant="secondary" onClick={handleBackClick}>
					Назад
				</Button>

				<Button type="submit" variant="primary">
					Продолжить
				</Button>
			</div>
		</form>
	);
};
