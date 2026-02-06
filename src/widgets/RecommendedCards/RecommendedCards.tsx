import React, { useState, useEffect, useRef } from 'react';
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
	const [visibleCount, setVisibleCount] = useState(9);
	const [isLoading, setIsLoading] = useState(false);
	const observerTarget = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setVisibleCount(9);
		setIsLoading(false);
	}, [cards]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (
					entries[0].isIntersecting &&
					visibleCount < cards.length &&
					!isLoading
				) {
					setIsLoading(true);

					setTimeout(() => {
						setVisibleCount((prev) => {
							const nextCount = prev + 9;
							return Math.min(nextCount, cards.length);
						});
						setIsLoading(false);
					}, 1000);
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
	}, [visibleCount, cards.length, isLoading]);

	const displayedCards = cards.slice(0, visibleCount);
	const hasMore = visibleCount < cards.length;

	return (
		<div className={`${styles.widget} ${className || ''}`}>
			<h2 className={styles.title}>Рекомендуем</h2>
			<div className={styles.grid}>
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
