import React from 'react';
import { CardInfo } from '../CardInfo';
import { Tag } from '../Tag';
import type { SkillCardProps } from './SkillCard.types';
import styles from './SkillCard.module.scss';

export const SkillCard: React.FC<SkillCardProps> = ({
	cardInfo,
	description,
	canTeach,
	wantsToLearn,
}) => {
	return (
		<div className={styles.card}>
			<CardInfo
				avatar={cardInfo.avatar}
				name={cardInfo.name}
				city={cardInfo.city}
				age={cardInfo.age}
				showLikeButton={false}
			/>

			<div className={styles.content}>
				<p className={styles.description}>{description}</p>

				<div className={styles['skills-section']}>
					<div className={styles['skills-group']}>
						<h3 className={styles['section-title']}>Может научить</h3>
						<div className={styles.tags}>
							{canTeach.map((skill, index) => (
								<Tag key={index} text={skill.text} color={skill.color} />
							))}
						</div>
					</div>

					<div className={styles['skills-group']}>
						<h3 className={styles['section-title']}>Хочет научиться</h3>
						<div className={styles.tags}>
							{wantsToLearn.map((skill, index) => (
								<Tag key={index} text={skill.text} color={skill.color} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
