import styles from './app.module.scss';
import { HomePage } from '../pages/HomePage';
import { testCards } from '../widgets/Cards/Cards.data';
// import { NotFoundPage } from '../pages/NotFoundPage';

function App() {
	return (
		<div className={styles.app}>
			<HomePage
				headerProps={{}}
				filterProps={{}}
				cardsProps={{
					title: 'Найдите своего ментора',
					cards: testCards,
					viewAllText: 'Смотреть все',
				}}
				recommendedProps={{
					cards: testCards.slice(0, 9),
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
		// <>
		// 	<ServerErrorPage />
		// </>
		// <>
		// 	<NotFoundPage />
		// </>
	);
}

export default App;
