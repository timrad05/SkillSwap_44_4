import { Card } from '../../shared/ui/Card/Card';
import type { CardsProps } from './Cards.types';
import styles from './Cards.module.scss';
import { Button } from '../../shared/ui/Button';
import chevronRightIcon from '/src/shared/assets/icons/chevron-right.svg';

export const Cards = ({
	title,
	cards,
	viewAllText = 'Смотреть все',
	onViewAllClick,
	className = '',
}: CardsProps) => {
	const displayedCards = cards.slice(0, 6);

	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.header}>
				<h2 className={styles.title}>{title}</h2>

				<Button variant="tertiary" onClick={onViewAllClick}>
					{viewAllText}
					<img
						src={chevronRightIcon}
						alt=""
						className={styles.chevronRightIcon}
					/>
				</Button>
			</div>

			<div className={styles.grid}>
				{displayedCards.map((card, index) => (
					<Card key={index} {...card} />
				))}
			</div>
		</div>
	);
};
