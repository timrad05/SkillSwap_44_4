import { useState } from 'react';
import type { FC } from 'react';
import styles from './FilteredCards.module.scss';

import { Card } from '../../shared/ui/Card';
import type { FilteredCardsProps } from './FilteredCards.types';

export const FilteredCards: FC<FilteredCardsProps> = ({
	cards,
	filterType = 'default',
}) => {
	const [newestFirst, setNewestFirst] = useState(true);

	const sortedCards = [...cards].sort((a, b) => {
		if (filterType === 'popular') {
			// Для популярных сортируем по лайкам
			const likesA = a.likes ?? 0;
			const likesB = b.likes ?? 0;
			return likesB - likesA;
		} else {
			// Для остальных сортируем по дате
			const dateA = new Date(a.registrationDate || '1970-01-01').getTime();
			const dateB = new Date(b.registrationDate || '1970-01-01').getTime();
			return newestFirst ? dateB - dateA : dateA - dateB;
		}
	});

	const handleSortClick = () => {
		if (filterType === 'popular') {
			// Для популярных сортировка фиксированная (по лайкам)
			return;
		}
		setNewestFirst(!newestFirst);
	};

	const getTitle = () => {
		if (filterType === 'popular') return 'Популярное';
		if (filterType === 'newest') return 'Новые';
		return 'Подходящие предложения';
	};

	const getSortButtonText = () => {
		if (filterType === 'popular') return 'По популярности';
		if (filterType === 'newest')
			return newestFirst ? 'Сначала новые' : 'Сначала старые';
		return newestFirst ? 'Сначала новые' : 'Сначала старые';
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h2 className={styles.title}>
					{getTitle()}: {cards.length}
				</h2>
				<button
					className={styles.sort}
					type="button"
					onClick={handleSortClick}
					disabled={filterType === 'popular'}
				>
					↑↓ {getSortButtonText()}
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
