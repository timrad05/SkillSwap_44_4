import styles from './app.module.scss';
import { HomePage } from '../pages/HomePage';
import { TestCards } from '../widgets/Cards/Cards.stories';

function App() {
	return (
		<div className={styles.app}>
			<HomePage
				headerProps={{}}
				filterProps={{}}
				cardsProps={{
					title: 'Найдите своего ментора',
					cards: TestCards,
					viewAllText: 'Показать всех',
				}}
				recommendedProps={{
					cards: TestCards.slice(0, 6),
				}}
				footerProps={{
					logoConfig: {
						name: 'SkillSwap',
						size: 'medium',
					},
					menuItems: [
						{ id: 'about', label: 'О проекте' },
						{ id: 'contact', label: 'Контакты' },
						{ id: 'privacy', label: 'Политика конфиденциальности' },
						{ id: 'skills', label: 'Все навыки' },
						{ id: 'blog', label: 'Блог' },
						{ id: 'terms', label: 'Пользовательское соглашение' },
					],
				}}
			/>
		</div>
	);
}

export default App;
