import { RadioGroup } from '../../shared/ui/RadioGroup';
import { CheckBox } from '../../shared/ui/CheckBox';
import chevronDownIcon from '../../shared/assets/icons/chevron-down.svg';
import chevronUpIcon from '../../shared/assets/icons/chevron-up.svg';
import crossIcon from '../../shared/assets/icons/cross.svg';
import styles from './Filter.module.scss';
import type { TFilterProps } from './Filter.types';
import { useState, useEffect, useMemo } from 'react';
import type { City } from '../../entities/city/model/types';
import { getCities } from '../../api/cities';
import type { ISkillSubcategory } from '../../entities/skill/model/types';

export const Filter = ({
	onRadioGroupChange,
	onCheckBoxToggle,
	onGenderChange,
	onCityToggle,
	className = '',
	selectedMode = 'all',
	selectedGender = 'any',
	selectedSkillIds = [],
	selectedCityIds = [],
	categories = [],
	subcategories = [],
	onReset,
}: TFilterProps) => {
	const [selectedSkillType, setSelectedSkillType] = useState(selectedMode);
	const [selectedGenderState, setSelectedGenderState] =
		useState(selectedGender);

	const [selectedSkills, setSelectedSkills] = useState<Record<string, boolean>>(
		{},
	);
	const [selectedCities, setSelectedCities] = useState<Record<string, boolean>>(
		{},
	);

	// Состояние для переключения кнопки "Все категории"
	const [isAllCategoriesShown, setIsAllCategoriesShown] = useState(false);
	// Состояния для раскрытия отдельных категорий
	const [expandedCategories, setExpandedCategories] = useState<
		Record<string, boolean>
	>({});
	const [isCitiesExpanded, setIsCitiesExpanded] = useState(false);

	const [cities, setCities] = useState<City[]>([]);
	const [isCitiesLoading, setIsCitiesLoading] = useState(true);

	useEffect(() => {
		getCities()
			.then((citiesData) => {
				setCities(citiesData);
			})
			.catch((err) => console.error('Ошибка загрузки городов:', err))
			.finally(() => setIsCitiesLoading(false));
	}, []);

	useEffect(() => {
		const skillsState: Record<string, boolean> = {};
		selectedSkillIds?.forEach((id) => {
			skillsState[id] = true;
		});
		setSelectedSkills(skillsState);
	}, [selectedSkillIds]);

	// Инициализация выбранных городов из пропсов
	useEffect(() => {
		const citiesState: Record<string, boolean> = {};
		selectedCityIds?.forEach((id) => {
			citiesState[id] = true;
		});
		setSelectedCities(citiesState);
	}, [selectedCityIds]);

	// Инициализация выбранного типа навыка
	useEffect(() => {
		setSelectedSkillType(selectedMode);
	}, [selectedMode]);

	// Инициализация выбранного пола
	useEffect(() => {
		setSelectedGenderState(selectedGender);
	}, [selectedGender]);

	const skillTypeOptions = [
		{ value: 'all', label: 'Всё' },
		{ value: 'learn', label: 'Хочу научиться' },
		{ value: 'teach', label: 'Могу научить' },
	];

	const subcategoriesByCategoryId = useMemo(() => {
		const map: Record<string, ISkillSubcategory[]> = {};
		subcategories.forEach((subcategory) => {
			const key = subcategory.categoryId.toString();
			if (!map[key]) {
				map[key] = [];
			}
			map[key].push(subcategory);
		});
		return map;
	}, [subcategories]);

	const skillCategoryOptions = categories.map((category) => {
		const categoryId = category.id.toString();
		return {
			value: categoryId,
			label: category.name,
			hasSubcategories:
				(subcategoriesByCategoryId[categoryId] || []).length > 0,
		};
	});

	const authorGenderOptions = [
		{ value: 'any', label: 'Не имеет значения' },
		{ value: 'male', label: 'Мужской' },
		{ value: 'female', label: 'Женский' },
	];

	// Получаем только первые 5 городов для отображения по умолчанию
	const defaultCityOptions = cities.slice(0, 5).map((city) => ({
		value: city.id.toString(),
		label: city.name,
	}));

	// Полные данные городов для расширенного списка
	const allCityOptions = cities.map((city) => ({
		value: city.id.toString(),
		label: city.name,
	}));

	const handleSkillTypeChange = (value: string) => {
		setSelectedSkillType(value);
		if (onRadioGroupChange) {
			onRadioGroupChange(value);
		}
	};

	const handleGenderChange = (value: string) => {
		setSelectedGenderState(value);
		if (onGenderChange) {
			onGenderChange(value);
		}
	};

	const handleSkillToggle = (
		value: string,
		e?: React.MouseEvent | React.ChangeEvent,
	) => {
		if (e && 'preventDefault' in e) {
			e.preventDefault();
		}

		const newSkills = {
			...selectedSkills,
			[value]: !selectedSkills[value],
		};
		setSelectedSkills(newSkills);

		onCheckBoxToggle?.(value);
	};

	const isCategoryChecked = (categoryId: string) => {
		const categorySubcategories = subcategoriesByCategoryId[categoryId] || [];
		if (categorySubcategories.length === 0) return false;
		return categorySubcategories.every(
			(subcategory) => !!selectedSkills[subcategory.id.toString()],
		);
	};

	const handleCategoryCheckboxToggle = (
		categoryId: string,
		e?: React.MouseEvent | React.ChangeEvent,
	) => {
		if (e && 'preventDefault' in e) {
			e.preventDefault();
		}

		const categorySubcategories = subcategoriesByCategoryId[categoryId] || [];
		if (categorySubcategories.length === 0) return;

		const shouldSelectAll = !isCategoryChecked(categoryId);
		const newSkills = { ...selectedSkills };

		categorySubcategories.forEach((subcategory) => {
			const subcategoryId = subcategory.id.toString();

			if (shouldSelectAll) {
				newSkills[subcategoryId] = true;
			} else {
				delete newSkills[subcategoryId];
			}

			// Вызываем колбэк для каждой подкатегории
			onCheckBoxToggle?.(subcategoryId);
		});

		setSelectedSkills(newSkills);
	};

	const handleCategoryExpandToggle = (
		categoryId: string,
		e?: React.MouseEvent,
	) => {
		if (e) {
			e.preventDefault();
		}

		setExpandedCategories((prev) => ({
			...prev,
			[categoryId]: !prev[categoryId],
		}));
	};

	const handleCityToggle = (
		value: string,
		e?: React.MouseEvent | React.ChangeEvent,
	) => {
		if (e && 'preventDefault' in e) {
			e.preventDefault();
		}

		const newCities = {
			...selectedCities,
			[value]: !selectedCities[value],
		};
		setSelectedCities(newCities);
		if (onCityToggle) {
			onCityToggle(value);
		}
	};

	const handleAllCategoriesClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsAllCategoriesShown(!isAllCategoriesShown);
	};

	const handleAllCitiesClick = (e: React.MouseEvent) => {
		e.preventDefault();
		setIsCitiesExpanded(!isCitiesExpanded);
	};

	const shouldShowSubcategories = (categoryId: string) => {
		const categorySubcategories = subcategoriesByCategoryId[categoryId] || [];

		return (
			expandedCategories[categoryId] ||
			categorySubcategories.some(
				(subcategory) => selectedSkills[subcategory.id.toString()],
			)
		);
	};

	const MAX_VISIBLE_CATEGORIES = 6;
	const visibleCategories = isAllCategoriesShown
		? skillCategoryOptions
		: skillCategoryOptions.slice(0, MAX_VISIBLE_CATEGORIES);

	return (
		<div className={`${styles.filter} ${className}`}>
			<div className={styles['filter-wrapper']}>
				<h2 className={styles.title}>Фильтры</h2>
				<div className={styles['reset-button-wrapper']}>
					<button
						onClick={onReset}
						className={styles['reset-button']}
						type="button"
					>
						<span className={styles['reset-text']}>Сбросить</span>
						<img
							src={crossIcon}
							alt="Сбросить"
							className={styles['reset-icon']}
							width="24"
							height="24"
						/>
					</button>
				</div>
			</div>
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
					{visibleCategories.map((option) => {
						const categorySubcategories =
							subcategoriesByCategoryId[option.value] || [];
						const showSubcategories = shouldShowSubcategories(option.value);
						const isCategorySelected = isCategoryChecked(option.value);

						return (
							<div key={option.value}>
								<CheckBox
									option={{ value: option.value, label: option.label }}
									checked={isCategorySelected}
									isParent={true}
									hasSubcategories={option.hasSubcategories}
									onToggle={handleCategoryCheckboxToggle}
									onLabelClick={handleCategoryExpandToggle}
									showChevron={option.hasSubcategories}
									isExpanded={showSubcategories}
								/>
								{showSubcategories && categorySubcategories.length > 0 && (
									<div style={{ marginLeft: '32px', marginTop: '8px' }}>
										{categorySubcategories.map((subcategory) => (
											<CheckBox
												key={subcategory.id}
												option={{
													value: subcategory.id.toString(),
													label: subcategory.name,
												}}
												checked={!!selectedSkills[subcategory.id.toString()]}
												onToggle={handleSkillToggle}
											/>
										))}
									</div>
								)}
							</div>
						);
					})}
				</div>
				<button
					type="button"
					className={styles['expand-button']}
					onClick={handleAllCategoriesClick}
					aria-expanded={isAllCategoriesShown}
				>
					<span className={styles['expand-button-text']}>
						{isAllCategoriesShown ? 'Все категории' : 'Все категории'}
					</span>
					<img
						src={isAllCategoriesShown ? chevronUpIcon : chevronDownIcon}
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
					value={selectedGenderState}
					className={styles['radio-group']}
				/>
			</div>

			<div className={styles.section}>
				<h3 className={styles.subtitle}>Город</h3>
				{isCitiesLoading ? (
					<div className={styles.loading}>Загрузка городов...</div>
				) : (
					<>
						<div className={styles['checkbox-group']}>
							{(isCitiesExpanded ? allCityOptions : defaultCityOptions).map(
								(option) => (
									<CheckBox
										key={option.value}
										option={option}
										checked={!!selectedCities[option.value]}
										onToggle={handleCityToggle}
									/>
								),
							)}
						</div>
						<button
							type="button"
							className={styles['expand-button']}
							onClick={handleAllCitiesClick}
							aria-expanded={isCitiesExpanded}
						>
							<span className={styles['expand-button-text']}>
								{isCitiesExpanded ? 'Все города' : 'Все города'}
							</span>
							<img
								src={isCitiesExpanded ? chevronUpIcon : chevronDownIcon}
								alt=""
								aria-hidden="true"
								className={styles['chevron-icon']}
							/>
						</button>
					</>
				)}
			</div>
		</div>
	);
};
