import type { CardsProps } from '../../widgets/Cards';
import type { TFilterProps } from '../../widgets/Filter';
import type { FooterProps } from '../../widgets/Footer';
import type { HeaderProps } from '../../widgets/Header';
import type { RecommendedCardsProps } from '../../widgets/RecommendedCards';

export interface HomePageProps {
	headerProps?: HeaderProps;
	filterProps?: TFilterProps;
	cardsProps?: CardsProps;
	recommendedProps?: RecommendedCardsProps;
	footerProps?: FooterProps;
}

export interface Filters {
	mode?: 'all' | 'wantToLearn' | 'canTeach';
	skillIds?: string[];
	gender?: 'any' | 'male' | 'female';
	cityIds?: string[];
	search?: string;
	showNewest?: boolean;
}
