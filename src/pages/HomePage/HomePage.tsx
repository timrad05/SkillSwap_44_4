import { useEffect, useState, useCallback } from 'react';
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

	useEffect(() => {
		const citiesById = buildById(cities);
		const categoriesById = buildById(categories);
		const subcategoriesById = buildById(subcategories);

		const cardsArrayVM: SkillCardVM[] = users.map((user) =>
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
	}, [users, cities, categories, subcategories]);

	const handleModeChange = useCallback((mode: string) => {
		setFilters((prev) => ({
			...prev,
			mode: mode as 'all' | 'learn' | 'teach',
		}));
		console.log('Mode changed to:', mode);
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
							selectedMode={filters.mode}
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
