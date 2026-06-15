import type { CardProps } from '../../shared/ui/Card/Card.types';

export interface CardsProps {
	title?: string;
	cards: CardProps[];
	viewAllText?: string;
	showAllButton?: boolean;
	onViewAllClick?: () => void;
	className?: string;
}
