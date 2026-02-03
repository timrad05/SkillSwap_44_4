import { ProfileInfo } from '../../shared/ui/ProfileInfo';
import { SidebarMenu } from '../../shared/ui/SidebarMenu';
import { Footer } from '../../widgets/Footer';
import { Header } from '../../widgets/Header';
import type { ProfilePageProps } from './ProfilePage.types';
import styles from './ProfilePage.module.scss';
import { useEffect, useState } from 'react';
import {
	getCurrentUser,
	setCurrentUser,
	type User,
} from '../../entities/user/model';
import type { City } from '../../entities/city/model/types';
import { getCities } from '../../api/cities';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = ({
	headerProps = {},
	sidebarProps = {
		items: [],
		activeId: '',
		onSelect: undefined,
	},
	footerProps = {},
	profileinfoProps = {},
}: ProfilePageProps) => {
	const navigate = useNavigate();
	const [user, setUser] = useState<User | null>(null);
	const [cities, setCities] = useState<City[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		//Убрать после реализации авторизации
		setCurrentUser({
			id: 1,
			name: 'Иван Васильевич',
			email: 'mail@m.ru',
			avatar: 'https://i.pravatar.cc/150?img=11',
			cityId: 1,
			dateOfBirth: '1981.10.25',
			canTeach: [18],
			wantToLearn: [24, 32],
			gender: 'male',
			about:
				'Инженер-механик, увлекаюсь рыбалкой и походами на природу. Ценю честность.',
			registrationDate: '2026-01-19',
		});
		////////////////////////////////////////////
		getCities()
			.then((data) => {
				setCities(data);
			})
			.catch((err) => console.error('Ошибка загрузки данных:', err))
			.finally(() => setIsLoading(false));
		setUser(getCurrentUser());
	}, []);

	if (isLoading) {
		return <div className={styles.page}>Загрузка...</div>;
	}
	if (!isLoading && !user) {
		navigate('/login', { replace: true });
	}

	return (
		<div className={styles.page}>
			<Header {...headerProps} />

			<main className={styles.main}>
				<aside className={styles.sidebar}>
					<SidebarMenu {...sidebarProps} />
				</aside>
				<div className={styles.profile}>
					<ProfileInfo {...profileinfoProps} cities={cities} user={user} />
				</div>
			</main>
			<Footer {...footerProps} />
		</div>
	);
};
