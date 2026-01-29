import styles from './app.module.scss';
import { Route, Routes } from 'react-router-dom';
/* Homepage */
import { HomePage } from '../pages/HomePage';
import { testCards } from '../widgets/Cards/Cards.data';
/* LoginPage */
import { LoginPage } from '../pages/LoginPage';
/* RegisterPage */
import { RegisterPage } from '../pages/RegisterPage';
/* ProfilePage */
import { ProfilePage } from '../pages/ProfilePage';
import { SidebarItems } from '../shared/ui/SidebarMenu/SidebarMenu.stories';
/* ServerErrorPage */
import { ServerErrorPage } from '../pages/ServerErrorPage';
/* NotFoundPage */
import { NotFoundPage } from '../pages/NotFoundPage';

function App() {
	return (
		/* Homepage */
		<div className={styles.app}>
			<Routes>
				<Route
					path="/"
					element={
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
					}
				/>
				<Route path="login" element={<LoginPage />} />
				<Route path="registration" element={<RegisterPage />} />
				<Route
					path="profile"
					element={
						<ProfilePage
							headerProps={{}}
							sidebarProps={{
								items: SidebarItems,
								activeId: 'profile',
								onSelect: (id) => console.log(`Selected: ${id}`),
							}}
							profileinfoProps={{}}
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
					}
				/>
				<Route path="505" element={<ServerErrorPage />} />
				<Route path="404" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
}
export default App;
