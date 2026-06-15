import { useState, type FC } from 'react';
import styles from './CardInfo.module.scss';
import type { CardInfoProps } from './CardInfo.types.ts';
import { Like } from '../Like';

export const CardInfo: FC<CardInfoProps> = ({
	avatar,
	name,
	city,
	age,
	likes = 0,
	onLikeClick,
	isLiked = false,
	showLikeButton = true,
}) => {
	const [likeCount, setLikeCount] = useState(likes);
	const [liked, setLiked] = useState(isLiked);

	const handleLikeClick = () => {
		if (onLikeClick) {
			onLikeClick();
		}

		if (liked) {
			setLikeCount((prev) => prev - 1);
		} else {
			setLikeCount((prev) => prev + 1);
		}
		setLiked(!liked);
	};

	return (
		<div className={styles.card}>
			<img src={avatar} alt={name} className={styles.avatar} />

			<div className={styles.info}>
				<div className={styles.name}>{name}</div>
				<div className={styles.meta}>
					{city}, {age} года
				</div>
			</div>

			{showLikeButton && (
				<div className={styles.like}>
					<span className={styles.counter}>{likeCount}</span>
					<Like isActive={liked} onClick={handleLikeClick} />
				</div>
			)}
		</div>
	);
};
