// import { useState } from 'react';
// import type { FC } from 'react';
// import styles from './FilteredCards.module.scss';

// import { Card } from '../../shared/ui/Card';
// import type { FilteredCardsProps } from './FilteredCards.types';

// export const FilteredCards: FC<FilteredCardsProps> = ({
// 	cards,
// 	filterType = 'default',
// }) => {
// 	const [newestFirst, setNewestFirst] = useState(true);

// 	const sortedCards = [...cards].sort((a, b) => {
// 		if (filterType === 'popular') {
// 			// Для популярных сортируем по лайкам
// 			const likesA = a.likes ?? 0;
// 			const likesB = b.likes ?? 0;
// 			return likesB - likesA;
// 		} else {
// 			// Для остальных сортируем по дате
// 			const dateA = new Date(a.registrationDate || '1970-01-01').getTime();
// 			const dateB = new Date(b.registrationDate || '1970-01-01').getTime();
// 			return newestFirst ? dateB - dateA : dateA - dateB;
// 		}
// 	});

// 	const handleSortClick = () => {
// 		if (filterType === 'popular') {
// 			// Для популярных сортировка фиксированная (по лайкам)
// 			return;
// 		}
// 		setNewestFirst(!newestFirst);
// 	};

// 	const getTitle = () => {
// 		if (filterType === 'popular') return 'Популярное';
// 		if (filterType === 'newest') return 'Новые';
// 		return 'Подходящие предложения';
// 	};

// const getSortButtonText = () => {
// 	if (filterType === 'popular') return 'По популярности';
// 	if (filterType === 'newest')
// 		return newestFirst ? 'Сначала новые' : 'Сначала старые';
// 	return newestFirst ? 'Сначала новые' : 'Сначала старые';
// };

// 	return (
// 		<div className={styles.wrapper}>
// 			<div className={styles.header}>
// 				<h2 className={styles.title}>
// 					{getTitle()}: {cards.length}
// 				</h2>
// 				<button
// 					className={styles.sort}
// 					type="button"
// 					onClick={handleSortClick}
// 					disabled={filterType === 'popular'}
// 				>
// 					↑↓ {getSortButtonText()}
// 				</button>
// 			</div>

// 			<div className={styles.cards}>
// 				{sortedCards.map((card, index) => (
// 					<Card key={index} {...card} />
// 				))}
// 			</div>
// 		</div>
// 	);
// };

import { useState, useEffect, useRef } from 'react';
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
			const likesA = a.likes ?? 0;
			const likesB = b.likes ?? 0;
			return likesB - likesA;
		} else {
			const dateA = new Date(a.registrationDate || '1970-01-01').getTime();
			const dateB = new Date(b.registrationDate || '1970-01-01').getTime();
			return newestFirst ? dateB - dateA : dateA - dateB;
		}
	});

	const handleSortClick = () => {
		if (filterType === 'popular') return;
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

	const [visibleCount, setVisibleCount] = useState(12);
	const [isLoading, setIsLoading] = useState(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setVisibleCount(12);
		setIsLoading(false);
	}, [cards, filterType]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting &&
					visibleCount < sortedCards.length &&
					!isLoading
				) {
					setIsLoading(true);

					// Имитация задержки сети для визуализации
					setTimeout(() => {
						setVisibleCount((prev) => {
							const nextCount = prev + 12;
							return Math.min(nextCount, sortedCards.length);
						});
						setIsLoading(false);
					}, 600);
				}
			},
			{ threshold: 0.1 },
		);

		const currentTarget = observerTarget.current;
		if (currentTarget) {
			observer.observe(currentTarget);
		}

		return () => {
			if (currentTarget) {
				observer.unobserve(currentTarget);
			}
		};
	}, [visibleCount, sortedCards.length, isLoading]);

	const displayedCards = sortedCards.slice(0, visibleCount);
	const hasMore = visibleCount < sortedCards.length;

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<h2 className={styles.title}>
					{getTitle()}: {sortedCards.length}
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
				{displayedCards.map((card, index) => (
					<Card key={index} {...card} />
				))}
			</div>

			{isLoading && (
				<div className={styles['loader-container']}>Загрузка...</div>
			)}

			{hasMore && (
				<div ref={observerTarget} className={styles['observer-target']}></div>
			)}
		</div>
	);
};
