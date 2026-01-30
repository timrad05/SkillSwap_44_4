import { useState } from 'react';
import styles from './Card.module.scss';
import { Link } from 'react-router-dom';
import { CardInfo } from '../CardInfo';
import { Tag } from '../Tag';
import { Button } from '../Button';

import type { CardProps } from './Card.types';

export const Card = ({
	avatar,
	name,
	city,
	age,
	canTeach,
	wantToLearn,
	onMoreClick,
	onLikeClick,
	isLiked: externalIsLiked,
}: CardProps) => {
	// Локальное состояние лайка
	const [internalIsLiked, setInternalIsLiked] = useState(false);

	// Если isLiked передан извне - используем его, иначе внутреннее состояние
	const isLiked =
		externalIsLiked !== undefined ? externalIsLiked : internalIsLiked;

	const handleLikeClick = () => {
		if (onLikeClick) {
			// Если есть внешний обработчик - вызываем его
			onLikeClick();
		} else {
			// Иначе управляем внутренним состоянием
			setInternalIsLiked(!isLiked);
			console.log(
				`Лайк карточки "${name}": ${!isLiked ? 'поставлен' : 'убран'}`,
			);
		}
	};

	return (
		<div className={styles.card}>
			<CardInfo
				avatar={avatar}
				name={name}
				city={city}
				age={age}
				onLikeClick={handleLikeClick}
				isLiked={isLiked}
			/>

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
			<Link to="/skill">
				<Button variant="primary" onClick={onMoreClick}>
					Подробнее
				</Button>
			</Link>
		</div>
	);
};
