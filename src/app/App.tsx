import styles from './app.module.scss';
/* Homepage */
import { HomePage } from '../pages/HomePage';
import { testCards } from '../widgets/Cards/Cards.data';

/* LoginPage */
//import { LoginPage } from '../pages/LoginPage';
/* RegisterPage */
// import { RegisterPage } from '../pages/RegisterPage';
/* ProfilePage */
// import { ProfilePage } from '../pages/ProfilePage';
// import { SidebarItems } from '../shared/ui/SidebarMenu/SidebarMenu.stories';
/* NotFoundPage */
// import { NotFoundPage } from '../pages/NotFoundPage';
/* ServerErrorPage */
// import { ServerErrorPage } from '../pages/ServerErrorPage';
/* SkillPage */
// import { SkillPage } from '../pages/SkillPage';

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
		//	<div className={styles.app}>
		//	<LoginPage />
		//</div>
		/* RegisterPage */
		// <div className={styles.app}>
		// 	<RegisterPage />
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
		/* SkillPage */
		/*
    <div className={styles.app}>
      <SkillPage
        headerProps={{
          isAuthorized: true,
          isAuthPage: false,
        }}
        skillProps={{
          title: 'Игра на барабанах',
          subtitle: 'Творчество и искусство / Музыка и звук',
          description: 'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры',
          buttonProps: {
            text: 'Предложить обмен',
            onClick: () => console.log('Кнопка "Предложить обмен" нажата'),
            variant: 'primary',
          },
          images: [
            'https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg',
            'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
            'https://images.ctfassets.net/pvkenuwtinkd/5avWBzXrPaIzAVLnKfQPhG/62c75fce546a463dc9882b6f4977c15a/K20_GettyImages-1150996895_CMYK.jpg?q=80&w=1600',
            'https://jurlique.com.au/cdn/shop/articles/7_WAYS_TO_MAKE_EVERY_DAY_EARTH_DAY_9c2990e0-c893-4d66-9e7a-29b89c8dcf60.jpg?v=1742172049',
          ],
          isLiked: false,
          onLikeClick: () => console.log('Лайк нажат'),
          onShareClick: () => console.log('Поделиться'),
          onMoreClick: () => console.log('Еще действия'),
        }}
        userCardProps={{
          cardInfo: {
            avatar: 'https://clck.ru/3RPQFg',
            name: 'Иван',
            city: 'Санкт-Петербург',
            age: 34,
          },
          description: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
          canTeach: [
            { text: 'Игра на барабанах', color: 'creativity' as const },
          ],
          wantsToLearn: [
            { text: 'Тайм менеджмент', color: 'education' as const },
            { text: 'Медитация', color: 'health' as const },
          ],
        }}
        similarCardsProps={{
          title: 'Похожие предложения',
          cards: [
            {
              avatar: 'https://i.pravatar.cc/150?img=5',
              name: 'Илона',
              city: 'Екатеринбург',
              age: 33,
              canTeach: [{ text: 'Английский язык', color: 'languages' as const }],
              wantToLearn: [
                { text: 'Тайм менеджмент', color: 'education' as const },
                { text: 'Медитация', color: 'health' as const },
                { text: '+2', color: 'plus' as const },
              ],
              isLiked: false,
            },
            {
              avatar: 'https://i.pravatar.cc/150?img=6',
              name: 'Михаил',
              city: 'Новосибирск',
              age: 29,
              canTeach: [{ text: 'Английский язык', color: 'languages' as const }],
              wantToLearn: [
                { text: 'Тайм менеджмент', color: 'education' as const },
                { text: 'Медитация', color: 'health' as const },
                { text: '+2', color: 'plus' as const },
              ],
              isLiked: false,
            },
            {
              avatar: 'https://i.pravatar.cc/150?img=7',
              name: 'Мария',
              city: 'Краснодар',
              age: 21,
              canTeach: [{ text: 'Английский язык', color: 'languages' as const }],
              wantToLearn: [
                { text: 'Тайм менеджмент', color: 'education' as const },
                { text: 'Медитация', color: 'health' as const },
                { text: '+2', color: 'plus' as const },
              ],
              isLiked: false,
            },
            {
              avatar: 'https://i.pravatar.cc/150?img=8',
              name: 'Виктория',
              city: 'Кемерово',
              age: 30,
              canTeach: [{ text: 'Английский язык', color: 'languages' as const }],
              wantToLearn: [
                { text: 'Тайм менеджмент', color: 'education' as const },
                { text: 'Медитация', color: 'health' as const },
                { text: '+2', color: 'plus' as const },
              ],
              isLiked: false,
            },
          ],
        }}
      />
    </div>
    */
	);
}
export default App;
