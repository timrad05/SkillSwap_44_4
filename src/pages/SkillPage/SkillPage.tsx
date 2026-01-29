import React from 'react';
import { Header } from '../../widgets/Header';
import { Skill } from '../../shared/ui/Skill';
import { SkillCard } from '../../shared/ui/SkillCard';
import { SimilarCards } from '../../widgets/SimilarCards';
import { Footer } from '../../widgets/Footer';
import type { SkillPageProps } from './SkillPage.types';
import styles from './SkillPage.module.scss';

export const SkillPage: React.FC<SkillPageProps> = ({
	headerProps = { isAuthorized: false, isAuthPage: false },
	skillProps,
	userCardProps,
	similarCardsProps,
	footerProps = {
		logoConfig: { name: 'SkillSwap', size: 'medium' },
		menuItems: [
			{ id: 'about', label: 'О проекте' },
			{ id: 'contact', label: 'Контакты' },
			{ id: 'privacy', label: 'Политика конфиденциальности' },
			{ id: 'skills', label: 'Все навыки' },
			{ id: 'blog', label: 'Блог' },
			{ id: 'terms', label: 'Пользовательское соглашение' },
		],
	},
}) => {
	return (
		<div className={styles.page}>
			<Header {...headerProps} />

			<main className={styles.main}>
				<div className={styles['content-row']}>
					<div className={styles.sidebar}>
						<SkillCard {...userCardProps} />
					</div>

					<div className={styles['skill-container']}>
						<Skill {...skillProps} />
					</div>
				</div>

				<div className={styles['similar-cards-section']}>
					<SimilarCards {...similarCardsProps} />
				</div>
			</main>

			<div className={styles['footer-section']}>
				<Footer {...footerProps} />
			</div>
		</div>
	);
};
