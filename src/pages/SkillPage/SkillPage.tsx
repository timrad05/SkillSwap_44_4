import React, { useMemo, useState } from 'react';
import { Skill } from '../../shared/ui/Skill';
import userCircleIcon from '../../shared/assets/icons/user-circle.svg';
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
	const [showSuccess, setShowSuccess] = useState(false);

	const skillPropsWithSuccess = useMemo(
		() => ({
			...skillProps,
			buttonProps: {
				...skillProps.buttonProps,
				onClick: () => {
					setShowSuccess(true);
					skillProps.buttonProps.onClick();
				},
			},
		}),
		[skillProps],
	);

	return (
		<div className={styles.page}>
			<Header {...headerProps} />

			<main className={styles.main}>
				<div className={styles['content-row']}>
					<div className={styles.sidebar}>
						<SkillCard {...userCardProps} />
					</div>
					<div className={styles['skill-container']}>
						<Skill {...skillPropsWithSuccess} />
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
								<img
									src={userCircleIcon}
									alt=""
									aria-hidden="true"
									width={100}
									height={100}
								/>
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
