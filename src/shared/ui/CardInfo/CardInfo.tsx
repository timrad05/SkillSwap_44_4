import type { FC } from 'react';
import styles from './CardInfo.module.scss';
import type { CardInfoProps } from './CardInfo.types.ts';
import { Like } from '../Like';

// Расскоментируй likes и <span> для отображения числа лайков!

export const CardInfo: FC<CardInfoProps> = ({
	avatar,
	name,
	city,
	age,
	// likes,
	onLikeClick,
	isLiked = false,
	showLikeButton = true,
}) => {
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
					<Like isActive={isLiked} onClick={onLikeClick} />
					{/* <span className={styles.count}>{likes}</span>  */}
				</div>
			)}
		</div>
	);
};
