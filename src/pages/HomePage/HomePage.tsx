import { useEffect, useState, useCallback, useMemo } from 'react';
import { Filter } from '../../widgets/Filter';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { RecommendedCards } from '../../widgets/RecommendedCards';
import { Cards } from '../../widgets/Cards';
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

	const [filters, setFilters] = useState<Filters>({
		mode: 'all',
		skillIds: [],
		gender: 'any',
		cityIds: [],
		search: '',
	});

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

	// Фильтрация
	const filteredUsers = useMemo(() => {
		if (!users.length) return [];

		return users.filter((user) => {
			// 1. Фильтр по полу
			if (filters.gender && filters.gender !== 'any') {
				if (user.gender !== filters.gender) return false;
			}

			// 2. Фильтр по городу
			if (filters.cityIds && filters.cityIds.length > 0) {
				// user.cityId - number (например, 1 для Москвы)
				// filters.cityIds - string[] (например, ['moscow', 'spb'])
			}

			// 3. Фильтр по режиму и навыкам
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

			// 4. Фильтр по поиску
			if (filters.search && filters.search.trim() !== '') {
				const searchLower = filters.search.toLowerCase();
				const userName = user.name?.toLowerCase() || '';
				return userName.includes(searchLower);
			}

			// 5. Если никакие фильтры не применены
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
		const cardsData = cardsArrayVM.map((item) => ({
			avatar: item.avatar || '',
			name: item.userName,
			city: item.cityName,
			age: item.age,
			canTeach: item.canTeach,
			wantToLearn: item.wantToLearn,
		}));
		setCards(cardsData);
	}, [filteredUsers, cities, categories, subcategories]);

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

	if (isLoading) {
		return <div className={styles.page}>Загрузка...</div>;
	}

	// Отладочный вывод
	console.log('=== ФИЛЬТРАЦИЯ (MVP) ===');
	console.log('Всего пользователей:', users.length);
	console.log('Отфильтровано:', filteredUsers.length);
	console.log('Режим (внутренний):', filters.mode);
	console.log('Выбранные навыки:', filters.skillIds);

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
						<section className={styles['cards-section']}>
							<Cards {...cardsProps} cards={cards} />
						</section>
						<section className={styles['cards-section']}>
							<Cards {...cardsProps} title="Новое" cards={cards} />
						</section>
						<section className={styles['recommended-section']}>
							<RecommendedCards {...recommendedProps} cards={cards} />
						</section>
					</div>
				</div>
			</main>

			<Footer {...footerProps} />
		</div>
	);
};
