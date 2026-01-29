import React from 'react';
import { Card } from '../../shared/ui/Card';
import type { SimilarCardsProps } from './SimilarCards.types';
import styles from './SimilarCards.module.scss';

export const SimilarCards: React.FC<SimilarCardsProps> = ({
	cards,
	title = 'Похожие предложения',
	className = '',
}) => {
	const displayedCards = cards.slice(0, 4);

	return (
		<div className={`${styles['similar-cards']} ${className}`}>
			<h2 className={styles.title}>{title}</h2>

			<div className={styles.grid}>
				{displayedCards.map((card, index) => (
					<Card key={`${card.name}-${index}`} {...card} />
				))}
			</div>
		</div>
	);
};
