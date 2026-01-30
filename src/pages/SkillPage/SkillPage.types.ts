import type { TagColor } from '../../shared/ui/Tag/Tag.types';

export interface SkillPageProps {
	headerProps?: {
		isAuthorized?: boolean;
		isAuthPage?: boolean;
	};
	skillProps: {
		title: string;
		subtitle: string;
		description: string;
		buttonProps: {
			text: string;
			onClick: () => void;
			variant?: 'primary' | 'secondary' | 'tertiary';
			isExchangeProposed?: boolean;
		};
		images: string[];
		isLiked?: boolean;
		onLikeClick?: () => void;
		onShareClick?: () => void;
		onMoreClick?: () => void;
	};
	userCardProps: {
		cardInfo: {
			avatar: string;
			name: string;
			city: string;
			age: number;
		};
		description: string;
		canTeach: Array<{
			text: string;
			color?: TagColor;
		}>;
		wantsToLearn: Array<{
			text: string;
			color?: TagColor;
		}>;
	};
	similarCardsProps: {
		title?: string;
		cards: Array<{
			avatar: string;
			name: string;
			city: string;
			age: number;
			canTeach: Array<{ text: string; color?: TagColor }>;
			wantToLearn: Array<{ text: string; color?: TagColor }>;
			isLiked?: boolean;
		}>;
	};
	footerProps?: {
		copyrightYear?: number;
		logoConfig?: {
			name: string;
			size?: 'small' | 'medium' | 'large';
		};
		menuItems?: Array<{
			id: string;
			label: string;
			to?: string;
			icon?: React.ReactNode;
		}>;
	};
}
