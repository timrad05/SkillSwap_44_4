import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Skill } from '../../shared/ui/Skill';
import { SkillCard } from '../../shared/ui/SkillCard';
import { Footer } from '../../widgets/Footer';
import { Header } from '../../widgets/Header';
import { ModalSuccess } from '../../widgets/ModalSuccess/ModalSuccess';
import { SimilarCards } from '../../widgets/SimilarCards';
import styles from './SkillPage.module.scss';
import type { SkillPageProps } from './SkillPage.types';

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
	const location = useLocation();
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (params.get('success') === 'true') {
			setShowSuccess(true);
			// Убираем параметр из URL (чтобы модалка не появлялась при перезагрузке)
			window.history.replaceState({}, '', '/skill');
		}
	}, [location.search]);

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

			{showSuccess && (
				<>
					<div className={styles.overlay} />
					<div className={styles['modal-success-wrapper']}>
						<ModalSuccess
							icon={
								<svg
									width="75"
									height="75"
									viewBox="0 0 77 77"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M75.75 38.25C75.75 58.9607 58.9607 75.75 38.25 75.75C17.5393 75.75 0.75 58.9607 0.75 38.25C0.75 17.5393 17.5393 0.75 38.25 0.75C58.9607 0.75 75.75 17.5393 75.75 38.25Z"
										stroke="#253017"
										strokeWidth="1.5"
									/>
									<path
										d="M25.1006 39.0901L31.606 45.5957C33.508 47.4977 36.5917 47.4977 38.4935 45.5956L52.9358 31.1523"
										stroke="#253017"
										strokeWidth="1.5"
										strokeLinecap="round"
									/>
								</svg>
							}
							title="Ваше предложение создано"
							text="Теперь вы можете предложить обмен"
							onClose={() => setShowSuccess(false)}
						/>
					</div>
				</>
			)}
		</div>
	);
};
