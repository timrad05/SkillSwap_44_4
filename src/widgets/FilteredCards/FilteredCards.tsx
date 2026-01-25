import type { FC } from 'react';
import styles from './FilteredCards.module.scss';

import { Card } from '../../shared/ui/Card';
import type { FilteredCardsProps } from './FilteredCards.types';

export const FilteredCards: FC<FilteredCardsProps> = ({ cards }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h2 className={styles.title}>Подходящие предложения: {cards.length}</h2>

				<button className={styles.sort} type="button">
					↑↓ Сначала новые
				</button>
			</div>

			<div className={styles.cards}>
				{cards.map((card, index) => (
					<Card key={index} {...card} />
				))}
			</div>
		</div>
	);
};
