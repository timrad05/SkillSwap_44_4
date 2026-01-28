/* import styles from './app.module.scss';
import { HomePage } from '../pages/HomePage';
import { TestCards } from '../widgets/Cards/Cards.stories'; */
import { ProfilePage } from '../pages/ProfilePage/ProfilePage';
// Импортируем данные из SidebarMenu stories
import { SidebarItems } from '../shared/ui/SidebarMenu/SidebarMenu.stories';
// import { NotFoundPage } from '../pages/NotFoundPage';
// import { ProfilePage } from '../pages/ProfilePage';

function App() {
	return (
		/* <div className={styles.app}>
      <HomePage
        headerProps={{}}
        filterProps={{}}
        cardsProps={{
          title: 'Найдите своего ментора',
          cards: TestCards,
          viewAllText: 'Смотреть все',
        }}
        recommendedProps={{
          cards: TestCards.slice(0, 9),
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
    </div> */
		// <>
		//   <ServerErrorPage />
		// </>
		// <>
		//   <NotFoundPage />
		// </>
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
	);
}

export default App;
