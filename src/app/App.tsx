import styles from './app.module.scss';
/* Homepage */
import { HomePage } from '../pages/HomePage';
import { testCards } from '../widgets/Cards/Cards.data';
/* LoginPage */
// import { LoginPage } from '../pages/LoginPage';
/* ProfilePage */
// import { ProfilePage } from '../pages/ProfilePage';
// import { SidebarItems } from '../shared/ui/SidebarMenu/SidebarMenu.stories';
/* NotFoundPage */
// import { NotFoundPage } from '../pages/NotFoundPage';
/* ServerErrorPage */
// import { ServerErrorPage } from '../pages/ServerErrorPage';

function App() {
	return (
		/* Homepage */
		<div className={styles.app}>
			<HomePage
				headerProps={{}}
				filterProps={{}}
				cardsProps={{
					title: 'Популярное',
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
		/* LoginPage */
		// <div className={styles.app}>
		// 	<LoginPage />
		// </div>
		/* ProfilePage */
		// <div className={styles.app}>
		// 	<ProfilePage
		// 		headerProps={{}}
		// 		sidebarProps={{
		// 			items: SidebarItems,
		// 			activeId: 'profile',
		// 			onSelect: (id) => console.log(`Selected: ${id}`),
		// 		}}
		// 		profileinfoProps={{}}
		// 		footerProps={{
		// 			logoConfig: {
		// 				name: 'SkillSwap',
		// 				size: 'medium',
		// 			},
		// 			menuItems: [
		// 				{ id: 'about', label: 'О проекте' },
		// 				{ id: 'contact', label: 'Контакты' },
		// 				{ id: 'privacy', label: 'Политика конфиденциальности' },
		// 				{ id: 'skills', label: 'Все навыки' },
		// 				{ id: 'blog', label: 'Блог' },
		// 				{ id: 'terms', label: 'Пользовательское соглашение' },
		// 			],
		// 		}}
		// 	/>
		// </div>
		/* NotFoundPage */
		// <div className={styles.app}>
		//   <NotFoundPage />
		// </div>
		/* ServerErrorPage */
		// <div className={styles.app}>
		// 	 <ServerErrorPage />
		// </div>
	);
}
export default App;
