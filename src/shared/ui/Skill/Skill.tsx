import React, { useState } from 'react';
import { SkillInfo } from '../SkillInfo';
import { SkillImages } from '../SkillImages';
import { Like } from '../Like';
import shareIcon from '../../assets/icons/share.svg';
import moreIcon from '../../assets/icons/more-square.svg';
import type { SkillProps } from './Skill.types';
import styles from './Skill.module.scss';

export const Skill: React.FC<SkillProps> = ({
	title,
	subtitle,
	description,
	buttonProps: initialButtonProps,
	images,
	isLiked: externalIsLiked,
	onLikeClick: externalOnLikeClick,
	onShareClick,
	onMoreClick,
}) => {
	// Локальное состояние лайка
	const [internalIsLiked, setInternalIsLiked] = useState(false);
	const [likeCount, setLikeCount] = useState(0);

	// Если isLiked передан извне - используем его, иначе внутреннее состояние
	const isLiked =
		externalIsLiked !== undefined ? externalIsLiked : internalIsLiked;

	const handleLikeClick = () => {
		if (externalOnLikeClick) {
			// Если есть внешний обработчик - вызываем его
			externalOnLikeClick();
		} else {
			// Иначе управляем внутренним состоянием
			const newLikedState = !isLiked;
			setInternalIsLiked(newLikedState);
			setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));
			console.log(
				`Лайк навыка "${title}": ${newLikedState ? 'поставлен' : 'убран'}`,
			);
		}
	};

	const [isExchangeProposed, setIsExchangeProposed] = useState(
		initialButtonProps.isExchangeProposed || false,
	);

	const handleExchangeClick = () => {
		if (!isExchangeProposed) {
			setIsExchangeProposed(true);
			initialButtonProps.onClick();
		}
	};

	const buttonProps = {
		...initialButtonProps,
		onClick: handleExchangeClick,
		isExchangeProposed,
	};

	return (
		<div className={styles.container}>
			{/* Группа с иконками */}
			<div className={styles['icons-group']}>
				<div className={styles['icons-row']}>
					<span className={styles.counter}>{likeCount}</span>
					<Like
						isActive={isLiked}
						onClick={handleLikeClick}
						className={styles.icon}
					/>
					<button
						type="button"
						className={styles.icon}
						onClick={onShareClick}
						aria-label="Поделиться"
					>
						<img src={shareIcon} alt="" width={24} height={24} />
					</button>
					<button
						type="button"
						className={styles.icon}
						onClick={onMoreClick}
						aria-label="Еще"
					>
						<img src={moreIcon} alt="" width={24} height={24} />
					</button>
				</div>
			</div>

			{/* Группа с описанием и картинками */}
			<div className={styles['content-group']}>
				<div className={styles['content-row']}>
					{/* Левая часть: информация о навыке */}
					<div className={styles['info-section']}>
						<SkillInfo
							title={title}
							subtitle={subtitle}
							description={description}
							buttonProps={buttonProps}
						/>
					</div>

					{/* Правая часть: изображения */}
					<div className={styles['images-section']}>
						<SkillImages images={images} />
					</div>
				</div>
			</div>
		</div>
	);
};
