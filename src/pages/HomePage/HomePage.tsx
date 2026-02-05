import { useEffect, useState, useCallback, useMemo } from 'react';
import { Filter } from '../../widgets/Filter';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { RecommendedCards } from '../../widgets/RecommendedCards';
import { Cards } from '../../widgets/Cards';
import { FilteredCards } from '../../widgets/FilteredCards';
import { Chip } from '../../shared/ui/Chip';
import type { HomePageProps, Filters } from './HomePage.types';
import styles from './HomePage.module.scss';

import { getUsers } from '../../api/users';
import { getSkills } from '../../api/skills';
import { getCities } from '../../api/cities';

import type { User } from '../../entities/user/model/types';
import type {
	ISkillCategory,
	ISkillSubcategory,
	Skill,
} from '../../entities/skill/model/types';
import type { City } from '../../entities/city/model/types';
import {
	buildById,
	mapSkillToCardVM,
	type SkillCardVM,
} from '../../shared/lib';
import type { CardProps } from '../../shared/ui/Card';
import { getSubcategories } from '../../api/subcategories';
import { getCategories } from '../../api/categories';

const DEFAULT_FILTERS: Filters = {
	mode: 'all',
	skillIds: [],
	gender: 'any',
	cityIds: [],
	search: '',
};

type ChipType = {
	id: string;
	label: string;
	type: 'search' | 'mode' | 'skill' | 'city' | 'gender';
};

export const HomePage = ({
	headerProps = {},
	filterProps = {},
	cardsProps = { cards: [] },
	recommendedProps = { cards: [] },
	footerProps = {},
}: HomePageProps) => {
	const [users, setUsers] = useState<User[]>([]);
	const [skills, setSkills] = useState<Skill[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [categories, setCategories] = useState<ISkillCategory[]>([]);
	const [subcategories, setSubcategories] = useState<ISkillSubcategory[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [cards, setCards] = useState<CardProps[]>([]);
	const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
	const [chips, setChips] = useState<ChipType[]>([]);

	const handleModeChange = useCallback((mode: string) => {
		let correctMode: 'all' | 'wantToLearn' | 'canTeach';

		if (mode === 'learn') {
			correctMode = 'wantToLearn';
		} else if (mode === 'teach') {
			correctMode = 'canTeach';
		} else {
			correctMode = 'all';
		}

		setFilters((prev) => ({
			...prev,
			mode: correctMode,
		}));
		console.log('Mode changed to:', correctMode, '(original:', mode, ')');
	}, []);

	const handleSkillToggle = useCallback((skillId: string) => {
		setFilters((prev) => {
			const currentSkillIds = prev.skillIds || [];
			const newSkillIds = currentSkillIds.includes(skillId)
				? currentSkillIds.filter((id) => id !== skillId)
				: [...currentSkillIds, skillId];

			console.log('Skill IDs:', newSkillIds);
			return { ...prev, skillIds: newSkillIds };
		});
	}, []);

	const handleGenderChange = useCallback((gender: string) => {
		setFilters((prev) => ({
			...prev,
			gender: gender as 'any' | 'male' | 'female',
		}));
		console.log('Gender changed to:', gender);
	}, []);

	const handleCityToggle = useCallback((cityId: string) => {
		setFilters((prev) => {
			const currentCityIds = prev.cityIds || [];
			const newCityIds = currentCityIds.includes(cityId)
				? currentCityIds.filter((id) => id !== cityId)
				: [...currentCityIds, cityId];

			console.log('City IDs:', newCityIds);
			return { ...prev, cityIds: newCityIds };
		});
	}, []);

	const handleSearchChange = useCallback((search: string) => {
		setFilters((prev) => ({
			...prev,
			search,
		}));
		console.log('Search changed to:', search);
	}, []);

	const handleSearchClear = useCallback(() => {
		setFilters((prev) => ({
			...prev,
			search: '',
		}));
		console.log('Search cleared');
	}, []);

	const resetFilters = useCallback(() => {
		setFilters(DEFAULT_FILTERS);
		setChips([]);
		console.log('Все фильтры сброшены');
	}, []);

	useEffect(() => {
		const newChips: ChipType[] = [];

		if (filters.mode && filters.mode !== 'all') {
			const modeLabels: Record<'wantToLearn' | 'canTeach', string> = {
				wantToLearn: 'Хочу научиться',
				canTeach: 'Могу научить',
			};

			if (filters.mode === 'wantToLearn' || filters.mode === 'canTeach') {
				newChips.push({
					id: 'mode',
					label: modeLabels[filters.mode],
					type: 'mode',
				});
			}
		}

		if (filters.skillIds && filters.skillIds.length > 0) {
			subcategories.forEach((subcategory) => {
				if (filters.skillIds?.includes(subcategory.id.toString())) {
					newChips.push({
						id: `skill-${subcategory.id}`,
						label: subcategory.name,
						type: 'skill',
					});
				}
			});
		}

		if (filters.cityIds && filters.cityIds.length > 0) {
			cities.forEach((city) => {
				if (filters.cityIds?.includes(city.id.toString())) {
					newChips.push({
						id: `city-${city.id}`,
						label: city.name,
						type: 'city',
					});
				}
			});
		}

		if (filters.gender && filters.gender !== 'any') {
			const genderLabels: Record<'male' | 'female', string> = {
				male: 'Мужской',
				female: 'Женский',
			};

			if (filters.gender === 'male' || filters.gender === 'female') {
				newChips.push({
					id: 'gender',
					label: genderLabels[filters.gender],
					type: 'gender',
				});
			}
		}

		setChips(newChips);
	}, [filters, cities, subcategories]);

	const handleChipRemove = useCallback((chip: ChipType) => {
		console.log('Removing chip:', chip);

		setFilters((prev) => {
			const newFilters = { ...prev };

			const skillId = chip.id.replace('skill-', '');
			const cityId = chip.id.replace('city-', '');

			switch (chip.type) {
				case 'mode':
					newFilters.mode = 'all';
					break;
				case 'skill':
					newFilters.skillIds = (prev.skillIds || []).filter(
						(id) => id !== skillId,
					);
					break;
				case 'city':
					newFilters.cityIds = (prev.cityIds || []).filter(
						(id) => id !== cityId,
					);
					break;
				case 'gender':
					newFilters.gender = 'any';
					break;
				default:
					break;
			}

			return newFilters;
		});
	}, []);

	useEffect(() => {
		Promise.all([
			getUsers(),
			getSkills(),
			getCities(),
			getSubcategories(),
			getCategories(),
		])
			.then(
				([
					usersData,
					skillsData,
					citiesData,
					subcategoriesData,
					categoriesData,
				]) => {
					setUsers(usersData);
					setSkills(skillsData);
					setCities(citiesData);
					setSubcategories(subcategoriesData);
					setCategories(categoriesData);
					console.log(
						`Loaded: ${usersData.length} users, ${skillsData.length} skills, ${citiesData.length} cities, ${categoriesData.length} categories, ${subcategoriesData.length} subcategories`,
					);
				},
			)
			.catch((err) => console.error('Ошибка загрузки данных:', err))
			.finally(() => setIsLoading(false));
	}, []);

	const filteredUsers = useMemo(() => {
		if (!users.length) return [];

		return users.filter((user) => {
			if (filters.gender && filters.gender !== 'any') {
				if (user.gender !== filters.gender) return false;
			}

			if (filters.cityIds && filters.cityIds.length > 0) {
				if (user.cityId === undefined) {
					return false;
				}

				const selectedCityIds = filters.cityIds.map((id) => parseInt(id, 10));

				if (!selectedCityIds.includes(user.cityId)) {
					return false;
				}
			}

			const hasSelectedSkills = filters.skillIds && filters.skillIds.length > 0;

			if (filters.mode === 'wantToLearn' && hasSelectedSkills) {
				const userWantToLearnIds =
					user.wantToLearn?.map((id) => id.toString()) || [];
				const hasMatchingSkills = userWantToLearnIds.some((skillId) =>
					filters.skillIds!.includes(skillId),
				);
				return hasMatchingSkills;
			}

			if (filters.mode === 'canTeach' && hasSelectedSkills) {
				const userCanTeachIds = user.canTeach?.map((id) => id.toString()) || [];
				const hasMatchingSkills = userCanTeachIds.some((skillId) =>
					filters.skillIds!.includes(skillId),
				);
				return hasMatchingSkills;
			}

			if (filters.mode === 'all' && hasSelectedSkills) {
				const userWantToLearnIds =
					user.wantToLearn?.map((id) => id.toString()) || [];
				const userCanTeachIds = user.canTeach?.map((id) => id.toString()) || [];

				const matchesWantToLearn = userWantToLearnIds.some((skillId) =>
					filters.skillIds!.includes(skillId),
				);
				const matchesCanTeach = userCanTeachIds.some((skillId) =>
					filters.skillIds!.includes(skillId),
				);

				return matchesWantToLearn || matchesCanTeach;
			}

			if (filters.search && filters.search.trim() !== '') {
				const searchLower = filters.search.toLowerCase();
				const userName = user.name?.toLowerCase() || '';
				return userName.includes(searchLower);
			}

			return true;
		});
	}, [users, filters]);

	useEffect(() => {
		const citiesById = buildById(cities);
		const categoriesById = buildById(categories);
		const subcategoriesById = buildById(subcategories);

		const cardsArrayVM: SkillCardVM[] = filteredUsers.map((user) =>
			mapSkillToCardVM(user, citiesById, categoriesById, subcategoriesById),
		);
		const cardsData = cardsArrayVM.map((item, index) => ({
			avatar: item.avatar || '',
			name: item.userName,
			city: item.cityName,
			age: item.age,
			likes: item.likes,
			canTeach: item.canTeach,
			wantToLearn: item.wantToLearn,
			registrationDate: filteredUsers[index]?.registrationDate,
		}));
		setCards(cardsData);
	}, [filteredUsers, cities, categories, subcategories]);

	const newestCards = useMemo(() => {
		if (
			!users.length ||
			!cities.length ||
			!categories.length ||
			!subcategories.length
		) {
			return [];
		}

		const citiesById = buildById(cities);
		const categoriesById = buildById(categories);
		const subcategoriesById = buildById(subcategories);

		const userCards = users.map((user) => {
			const cardVM = mapSkillToCardVM(
				user,
				citiesById,
				categoriesById,
				subcategoriesById,
			);

			return {
				user,
				card: {
					avatar: cardVM.avatar || '',
					name: cardVM.userName,
					city: cardVM.cityName,
					age: cardVM.age,
					likes: cardVM.likes,
					canTeach: cardVM.canTeach,
					wantToLearn: cardVM.wantToLearn,
				},
			};
		});

		const sorted = [...userCards].sort((a, b) => {
			const dateAStr = a.user.registrationDate || '1970-01-01';
			const dateBStr = b.user.registrationDate || '1970-01-01';

			const dateA = new Date(dateAStr).getTime();
			const dateB = new Date(dateBStr).getTime();

			return dateB - dateA;
		});

		return sorted.map((item) => item.card);
	}, [users, cities, categories, subcategories]);

	const popularCards = useMemo(() => {
		if (
			!users.length ||
			!cities.length ||
			!categories.length ||
			!subcategories.length
		) {
			return [];
		}

		const citiesById = buildById(cities);
		const categoriesById = buildById(categories);
		const subcategoriesById = buildById(subcategories);

		const cards = users.map((user) => {
			const cardVM = mapSkillToCardVM(
				user,
				citiesById,
				categoriesById,
				subcategoriesById,
			);

			return {
				avatar: cardVM.avatar || '',
				name: cardVM.userName,
				city: cardVM.cityName,
				age: cardVM.age,
				likes: cardVM.likes ?? 0,
				canTeach: cardVM.canTeach,
				wantToLearn: cardVM.wantToLearn,
			};
		});

		return [...cards].sort((a, b) => b.likes - a.likes);
	}, [users, cities, categories, subcategories]);

	if (isLoading) {
		return <div className={styles.page}>Загрузка...</div>;
	}

	const hasActiveFilters =
		(filters.search ? filters.search.trim().length > 0 : false) ||
		(filters.skillIds?.length || 0) > 0 ||
		(filters.cityIds?.length || 0) > 0 ||
		filters.gender !== 'any' ||
		filters.mode !== 'all';

	console.log('=== ФИЛЬТРАЦИЯ (MVP) ===');
	console.log('Всего пользователей:', users.length);
	console.log('Отфильтровано:', filteredUsers.length);
	console.log('Активные фильтры:', hasActiveFilters);
	console.log('Режим (внутренний):', filters.mode);
	console.log('Выбранные навыки:', filters.skillIds);
	console.log('Выбранные города (ID):', filters.cityIds);
	console.log('Все города:', cities);

	return (
		<div className={styles.page}>
			<div style={{ display: 'none' }}>
				{users.length} {skills.length} {cities.length}
				<pre style={{ fontSize: '10px' }}>
					Filters: {JSON.stringify(filters, null, 2)}
				</pre>
			</div>
			<Header
				{...headerProps}
				searchProps={{
					value: filters.search,
					onChange: handleSearchChange,
					onClear: handleSearchClear,
				}}
			/>

			<main className={styles.main}>
				<div className={styles.layout}>
					<aside className={styles.sidebar}>
						<Filter
							{...filterProps}
							onRadioGroupChange={handleModeChange}
							onCheckBoxToggle={handleSkillToggle}
							onGenderChange={handleGenderChange}
							onCityToggle={handleCityToggle}
							onReset={resetFilters}
							categories={categories}
							subcategories={subcategories}
							selectedMode={
								filters.mode === 'wantToLearn'
									? 'learn'
									: filters.mode === 'canTeach'
										? 'teach'
										: 'all'
							}
							selectedGender={filters.gender}
							selectedSkillIds={filters.skillIds}
							selectedCityIds={filters.cityIds}
						/>
					</aside>

					<div className={styles.content}>
						{/* Контейнер для чипов */}
						{chips.length > 0 && (
							<div className={styles.chipsContainer}>
								<div className={styles.chipsWrapper}>
									{chips.map((chip) => (
										<Chip
											key={chip.id}
											label={chip.label}
											onRemove={() => handleChipRemove(chip)}
										/>
									))}
								</div>
							</div>
						)}

						{!hasActiveFilters ? (
							<>
								<section className={styles['cards-section']}>
									<Cards
										{...cardsProps}
										title="Популярное"
										cards={popularCards}
									/>
								</section>
								<section className={styles['cards-section']}>
									{/* Показываем отсортированные карточки в разделе "Новое" */}
									<Cards {...cardsProps} title="Новое" cards={newestCards} />
								</section>
								<section className={styles['recommended-section']}>
									<RecommendedCards {...recommendedProps} cards={cards} />
								</section>
							</>
						) : (
							<section className={styles['cards-section']}>
								{filteredUsers.length === 0 ? (
									<div className={styles['empty-state']} role="status">
										Ничего не найдено
									</div>
								) : (
									<FilteredCards cards={cards} />
								)}
							</section>
						)}
					</div>
				</div>
			</main>

			<Footer {...footerProps} />
		</div>
	);
};
