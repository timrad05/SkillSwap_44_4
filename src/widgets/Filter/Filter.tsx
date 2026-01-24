import { RadioGroup } from '../../shared/ui/RadioGroup';
import { CheckBox } from '../../shared/ui/CheckBox';
import chevronDownIcon from '../../shared/assets/icons/chevron-down.svg';
import chevronUpIcon from '../../shared/assets/icons/chevron-up.svg';
import styles from './Filter.module.scss';
import type { TFilterProps } from './Filter.types';
import { useState } from 'react';

export const Filter = ({
	onRadioGroupChange,
	onCheckBoxToggle,
	className = '',
}: TFilterProps) => {
	const [selectedSkillType, setSelectedSkillType] = useState('all');
	const [selectedGender, setSelectedGender] = useState('any');

	const [selectedSkills, setSelectedSkills] = useState<Record<string, boolean>>(
		{},
	);
	const [selectedCities, setSelectedCities] = useState<Record<string, boolean>>(
		{},
	);

	// Состояния для переключения шевронов
	const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
	const [isCitiesExpanded, setIsCitiesExpanded] = useState(false);

	// Состояния для подкатегорий
	const [creativityChecked, setCreativityChecked] = useState(false);
	const [creativitySubcategories, setCreativitySubcategories] = useState<
		Record<string, boolean>
	>({});

	// Состояние для отслеживания наведения на родительские категории
	const [hoveredParentCategory, setHoveredParentCategory] = useState<
		string | null
	>(null);

	const skillTypeOptions = [
		{ value: 'all', label: 'Всё' },
		{ value: 'learn', label: 'Хочу научиться' },
		{ value: 'teach', label: 'Могу научить' },
	];

	// Родительские категории навыков (все имеют подкатегории)
	const skillCategoryOptions = [
		{ value: 'business', label: 'Бизнес и карьера', hasSubcategories: true },
		{
			value: 'creativity',
			label: 'Творчество и искусство',
			hasSubcategories: true,
		},
		{ value: 'languages', label: 'Иностранные языки', hasSubcategories: true },
		{
			value: 'education',
			label: 'Образование и развитие',
			hasSubcategories: true,
		},
		{ value: 'health', label: 'Здоровье и лайфстайл', hasSubcategories: true },
		{ value: 'home', label: 'Дом и уют', hasSubcategories: true },
	];

	// Подкатегории для "Творчество и искусство"
	const creativitySubcategoryOptions = [
		{ value: 'drawing', label: 'Рисование и иллюстрация' },
		{ value: 'photography', label: 'Фотография' },
		{ value: 'video', label: 'Видеомонтаж' },
		{ value: 'music', label: 'Музыка и звук' },
		{ value: 'acting', label: 'Актерское мастерство' },
		{ value: 'writing', label: 'Креативное письмо' },
		{ value: 'artTherapy', label: 'Арт-терапия' },
		{ value: 'decor', label: 'Декор и DIY' },
	];

	const authorGenderOptions = [
		{ value: 'any', label: 'Не имеет значения' },
		{ value: 'male', label: 'Мужской' },
		{ value: 'female', label: 'Женский' },
	];

	const cityOptions = [
		{ value: 'moscow', label: 'Москва' },
		{ value: 'spb', label: 'Санкт-Петербург' },
		{ value: 'novosibirsk', label: 'Новосибирск' },
		{ value: 'ekaterinburg', label: 'Екатеринбург' },
		{ value: 'kazan', label: 'Казань' },
	];

	const handleSkillTypeChange = (value: string) => {
		setSelectedSkillType(value);
		onRadioGroupChange?.(value);
	};

	const handleGenderChange = (value: string) => {
		setSelectedGender(value);
		onRadioGroupChange?.(value);
	};

	const handleSkillToggle = (value: string, e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault();
		}

		const newSkills = {
			...selectedSkills,
			[value]: !selectedSkills[value],
		};
		setSelectedSkills(newSkills);

		if (value === 'creativity') {
			setCreativityChecked(!selectedSkills[value]);
		}

		onCheckBoxToggle?.(value);
	};

	const handleCreativitySubcategoryToggle = (
		value: string,
		e?: React.MouseEvent,
	) => {
		if (e) {
			e.preventDefault();
		}

		const newSubcategories = {
			...creativitySubcategories,
			[value]: !creativitySubcategories[value],
		};
		setCreativitySubcategories(newSubcategories);
		onCheckBoxToggle?.(value);
	};

	const handleCityToggle = (value: string, e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault();
		}

		const newCities = {
			...selectedCities,
			[value]: !selectedCities[value],
		};
		setSelectedCities(newCities);
		onCheckBoxToggle?.(value);
	};

	const handleAllCategoriesClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsCategoriesExpanded(!isCategoriesExpanded);
	};

	const handleAllCitiesClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsCitiesExpanded(!isCitiesExpanded);
	};

	const handleParentCategoryMouseEnter = (value: string) => {
		setHoveredParentCategory(value);
	};

	const handleParentCategoryMouseLeave = () => {
		setHoveredParentCategory(null);
	};

	return (
		<div className={`${styles.filter} ${className}`}>
			<h2 className={styles.title}>Фильтры</h2>

			<div className={styles.section}>
				<RadioGroup
					options={skillTypeOptions}
					onChange={handleSkillTypeChange}
					name="skill-type"
					value={selectedSkillType}
					className={styles['radio-group']}
				/>
			</div>

			<div className={styles.section}>
				<h3 className={styles.subtitle}>Навыки</h3>
				<div className={styles['checkbox-group']}>
					{skillCategoryOptions.map((option) => {
						const isHovered = hoveredParentCategory === option.value;
						const isCreativityExpanded =
							option.value === 'creativity' && creativityChecked;

						if (option.value === 'creativity') {
							return (
								<div
									key={option.value}
									onMouseEnter={() =>
										handleParentCategoryMouseEnter(option.value)
									}
									onMouseLeave={handleParentCategoryMouseLeave}
								>
									<CheckBox
										option={{ value: option.value, label: option.label }}
										checked={creativityChecked}
										isParent={true}
										hasSubcategories={option.hasSubcategories}
										onToggle={(value) => handleSkillToggle(value)}
										showChevron={isHovered || creativityChecked}
										isExpanded={isCreativityExpanded}
									/>

									{/* Подкатегории для творчества */}
									{creativityChecked && (
										<div style={{ marginLeft: '32px', marginTop: '8px' }}>
											{creativitySubcategoryOptions.map((subcategory) => (
												<CheckBox
													key={subcategory.value}
													option={subcategory}
													checked={!!creativitySubcategories[subcategory.value]}
													onToggle={(value) =>
														handleCreativitySubcategoryToggle(value)
													}
												/>
											))}
										</div>
									)}
								</div>
							);
						}

						return (
							<div
								key={option.value}
								onMouseEnter={() =>
									handleParentCategoryMouseEnter(option.value)
								}
								onMouseLeave={handleParentCategoryMouseLeave}
							>
								<CheckBox
									option={{ value: option.value, label: option.label }}
									checked={!!selectedSkills[option.value]}
									isParent={true}
									hasSubcategories={option.hasSubcategories}
									onToggle={(value) => handleSkillToggle(value)}
									showChevron={isHovered || !!selectedSkills[option.value]}
									isExpanded={!!selectedSkills[option.value]}
								/>
							</div>
						);
					})}
				</div>
				<button
					type="button"
					className={styles['expand-button']}
					onClick={handleAllCategoriesClick}
					aria-expanded={isCategoriesExpanded}
				>
					<span className={styles['expand-button-text']}>Все категории</span>
					<img
						src={isCategoriesExpanded ? chevronUpIcon : chevronDownIcon}
						alt=""
						aria-hidden="true"
						className={styles['chevron-icon']}
					/>
				</button>
			</div>

			<div className={styles.section}>
				<h3 className={styles.subtitle}>Пол автора</h3>
				<RadioGroup
					options={authorGenderOptions}
					onChange={handleGenderChange}
					name="author-gender"
					value={selectedGender}
					className={styles['radio-group']}
				/>
			</div>

			<div className={styles.section}>
				<h3 className={styles.subtitle}>Город</h3>
				<div className={styles['checkbox-group']}>
					{cityOptions.map((option) => (
						<CheckBox
							key={option.value}
							option={option}
							checked={!!selectedCities[option.value]}
							onToggle={(value) => handleCityToggle(value)}
						/>
					))}
				</div>
				<button
					type="button"
					className={styles['expand-button']}
					onClick={handleAllCitiesClick}
					aria-expanded={isCitiesExpanded}
				>
					<span className={styles['expand-button-text']}>Все города</span>
					<img
						src={isCitiesExpanded ? chevronUpIcon : chevronDownIcon}
						alt=""
						aria-hidden="true"
						className={styles['chevron-icon']}
					/>
				</button>
			</div>
		</div>
	);
};
