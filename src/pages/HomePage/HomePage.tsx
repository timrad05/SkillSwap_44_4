import { useEffect, useState } from 'react';
import { Filter } from '../../widgets/Filter';
import { Header } from '../../widgets/Header';
import { Footer } from '../../widgets/Footer';
import { RecommendedCards } from '../../widgets/RecommendedCards';
import { Cards } from '../../widgets/Cards';
import type { HomePageProps } from './HomePage.types';
import styles from './HomePage.module.scss';

import { getUsers } from '../../api/users';
import { getSkills } from '../../api/skills';
import { getCities } from '../../api/cities';

import type { User } from '../../entities/user/model/types';
import type { Skill } from '../../entities/skill/model/types';
import type { City } from '../../entities/city/model/types';
import {
	buildCitiesById,
	buildUsersById,
	mapSkillToCardVM,
	type SkillCardVM,
} from '../../shared/lib';
import type { CardProps } from '../../shared/ui/Card';

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
	const [isLoading, setIsLoading] = useState(true);
	const [cards, setCards] = useState<CardProps[]>([]);

	useEffect(() => {
		Promise.all([getUsers(), getSkills(), getCities()])
			.then(([usersData, skillsData, citiesData]) => {
				setUsers(usersData);
				setSkills(skillsData);
				setCities(citiesData);
				console.log(
					`Loaded: ${usersData.length} users, ${skillsData.length} skills, ${citiesData.length} cities`,
				);
			})
			.catch((err) => console.error('Ошибка загрузки данных:', err))
			.finally(() => setIsLoading(false));
	}, []);

	useEffect(() => {
		const usersById = buildUsersById(users);
		const citiesById = buildCitiesById(cities);
		const cardsArrayVM: SkillCardVM[] = skills.map((skill) =>
			mapSkillToCardVM(skill, usersById, citiesById),
		);
		const cardsData = cardsArrayVM.map((item) => ({
			avatar: item.avatar || '',
			name: item.userName,
			city: item.cityName,
			age: 0,
			canTeach: [],
			wantToLearn: [],
		}));
		setCards(cardsData);
	}, [users, skills, cities]);

	if (isLoading) {
		return <div className={styles.page}>Загрузка...</div>;
	}

	return (
		<div className={styles.page}>
			<div style={{ display: 'none' }}>
				{users.length} {skills.length} {cities.length}
			</div>
			<Header {...headerProps} />

			<main className={styles.main}>
				<div className={styles.layout}>
					<aside className={styles.sidebar}>
						<Filter {...filterProps} />
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
