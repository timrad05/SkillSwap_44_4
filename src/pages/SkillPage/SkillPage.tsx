import React, { useMemo, useState, useEffect } from 'react';
import { Skill } from '../../shared/ui/Skill';
import notificationIcon from '../../shared/assets/icons/notification.svg';
import { SkillCard } from '../../shared/ui/SkillCard';
import { Footer } from '../../widgets/Footer';
import { Header } from '../../widgets/Header';
import { ModalSuccess } from '../../widgets/ModalSuccess/ModalSuccess';
import { SimilarCards } from '../../widgets/SimilarCards';
import styles from './SkillPage.module.scss';
import type { SkillPageProps } from './SkillPage.types';

interface StorageSkillData {
	title: string;
	description: string;
	category: string;
	subcategory: string;
	images: string[];
}

interface StorageUserData {
	name: string;
	avatar?: string;
	canTeach?: Array<string | { text: string; color?: string }>;
	wantsToLearn?: Array<string | { text: string; color?: string }>;
}

interface StorageData {
	user: StorageUserData;
	skill: StorageSkillData;
}

export const SkillPage: React.FC<SkillPageProps> = ({
	headerProps = {},
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
	const [storageData, setStorageData] = useState<StorageData | null>(null);

	useEffect(() => {
		const saved = localStorage.getItem('skillPageData');
		if (saved) {
			try {
				setStorageData(JSON.parse(saved));
			} catch {
				console.log('Ошибка');
			}
		}
	}, []);

	const mergedSkillProps = useMemo(() => {
		if (!storageData?.skill) return skillProps;

		const skillImages = storageData.skill.images;
		const images = Array.isArray(skillImages) ? skillImages : [];

		return {
			...skillProps,
			title: storageData.skill.title,
			subtitle: `${storageData.skill.category} • ${storageData.skill.subcategory}`,
			description: storageData.skill.description,
			images: images.length > 0 ? images : skillProps.images,
		};
	}, [skillProps, storageData]);

	const mergedUserCardProps = useMemo(() => {
		if (!storageData?.user) return userCardProps;

		const formatSkills = (skills: StorageUserData['canTeach'] = []) => {
			return skills.map((skill) => {
				if (typeof skill === 'string') {
					return { text: skill, color: 'default' as const };
				}
				return { text: skill.text, color: skill.color || ('default' as const) };
			});
		};

		return {
			...userCardProps,
			cardInfo: {
				avatar: storageData.user.avatar || userCardProps.cardInfo.avatar,
				name: storageData.user.name || userCardProps.cardInfo.name,
				city: userCardProps.cardInfo.city,
				age: userCardProps.cardInfo.age,
			},
			canTeach: formatSkills(storageData.user.canTeach),
			wantsToLearn: formatSkills(storageData.user.wantsToLearn),
		};
	}, [userCardProps, storageData]);

	const skillPropsWithSuccess = useMemo(
		() => ({
			...mergedSkillProps,
			buttonProps: {
				...mergedSkillProps.buttonProps,
				onClick: () => {
					setShowSuccess(true);
					mergedSkillProps.buttonProps.onClick();
				},
			},
		}),
		[mergedSkillProps],
	);

	return (
		<div className={styles.page}>
			<Header {...headerProps} />

			<main className={styles.main}>
				<div className={styles['content-row']}>
					<div className={styles.sidebar}>
						<SkillCard {...mergedUserCardProps} />
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
									src={notificationIcon}
									alt=""
									aria-hidden="true"
									width={100}
									height={100}
								/>
							}
							title="Вы предложили обмен"
							text="Теперь дождитесь подтверждения. Вам придёт уведомление"
							onClose={() => setShowSuccess(false)}
						/>
					</div>
				</>
			)}
		</div>
	);
};
