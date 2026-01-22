import type { FC } from 'react';
import styles from './Card.module.scss';

import { CardInfo } from '../CardInfo';
import { Tag } from '../Tag';
import { Button } from '../Button';

import type { CardProps } from './Card.types';

export const Card: FC<CardProps> = ({
	avatar,
	name,
	city,
	age,
	canTeach,
	wantToLearn,
	onMoreClick,
}) => {
	return (
		<div className={styles.card}>
			<CardInfo avatar={avatar} name={name} city={city} age={age} />

			<div className={styles.section}>
				<div className={styles['section-title']}>Может научить:</div>
				<div className={styles.tags}>
					{canTeach.map((tag, index) => (
						<Tag key={index} text={tag.text} color={tag.color} />
					))}
				</div>
			</div>

			<div className={styles.section}>
				<div className={styles['section-title']}>Хочет научиться:</div>
				<div className={styles.tags}>
					{wantToLearn.map((tag, index) => (
						<Tag key={index} text={tag.text} color={tag.color} />
					))}
				</div>
			</div>

			<Button variant="primary" onClick={onMoreClick}>
				Подробнее
			</Button>
		</div>
	);
};
