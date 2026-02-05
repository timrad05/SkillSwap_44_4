import type { CardProps } from '../../shared/ui/Card';

export interface FilteredCardsProps {
	cards: CardProps[];
	filterType?: 'default' | 'newest' | 'popular';
	className?: string;
}
