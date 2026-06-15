export interface SkillProps {
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
}
