import type { FC } from 'react';
import { Card } from '../../shared/ui/Card';
import type { CardsProps } from './Cards.types';
import styles from './Cards.module.scss';
import { Button } from '../../shared/ui/Button';
import chevronRightIcon from '../../shared/assets/icons/chevron-right.svg';

export const Cards: FC<CardsProps> = ({
	title,
	cards,
	showAllButton = false,
	viewAllText = 'Смотреть все',
	onViewAllClick,
	className = '',
}) => {
	// Берем только первые 3 карточки для отображения
	const displayedCards = cards.slice(0, 3);

	if (!cards || cards.length === 0) {
		return null;
	}

	const handleViewAllClick = (e: React.MouseEvent) => {
		e.preventDefault();
		if (onViewAllClick) {
			onViewAllClick();
		}
	};

	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title}</h2>
				{showAllButton && onViewAllClick && (
					<Button
						variant="tertiary"
						onClick={handleViewAllClick}
						className={styles['view-all-button']}
					>
						{viewAllText}
						<img
							src={chevronRightIcon}
							alt=""
							className={styles['chevron-right-icon']}
						/>
					</Button>
				)}
			</div>
			<div className={styles.grid}>
				{displayedCards.map((card, index) => (
					<Card key={index} {...card} />
				))}
			</div>
		</div>
	);
};
