import { useState } from 'react';
import type { FC } from 'react';
import styles from './FilteredCards.module.scss';

import { Card } from '../../shared/ui/Card';
import type { FilteredCardsProps } from './FilteredCards.types';

export const FilteredCards: FC<FilteredCardsProps> = ({ cards }) => {
	const [newestFirst, setNewestFirst] = useState(true);

	const sortedCards = [...cards].sort((a, b) => {
		const dateA = new Date(a.registrationDate || '1970-01-01').getTime();
		const dateB = new Date(b.registrationDate || '1970-01-01').getTime();
		return newestFirst ? dateB - dateA : dateA - dateB;
	});

	const handleSortClick = () => {
		setNewestFirst(!newestFirst);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h2 className={styles.title}>Подходящие предложения: {cards.length}</h2>
				<button className={styles.sort} type="button" onClick={handleSortClick}>
					↑↓ {newestFirst ? 'Сначала новые' : 'Сначала старые'}
				</button>
			</div>

			<div className={styles.cards}>
				{sortedCards.map((card, index) => (
					<Card key={index} {...card} />
				))}
			</div>
		</div>
	);
};
