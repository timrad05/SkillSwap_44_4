// Более простой вариант RecommendedCards.tsx
import React from 'react';
import { Card } from '../../shared/ui/Card/Card';
import type { CardProps } from '../../shared/ui/Card/Card.types';
import styles from './RecommendedCards.module.scss';

interface RecommendedCardsProps {
	cards: CardProps[];
	className?: string;
}

export const RecommendedCards: React.FC<RecommendedCardsProps> = ({
	cards,
	className,
}) => {
	const displayedCards = cards.slice(0, 9);

	return (
		<div className={`${styles.widget} ${className || ''}`}>
			<h2 className={styles.title}>Рекомендуем</h2>
			<div className={styles.grid}>
				{displayedCards.map((card, index) => (
					<Card key={index} {...card} />
				))}
			</div>
		</div>
	);
};
