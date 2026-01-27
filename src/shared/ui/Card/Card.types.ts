import type { TagColor } from '../Tag/Tag.types';

export interface CardTag {
	text: string;
	color?: TagColor;
}

export interface CardProps {
	avatar: string;
	name: string;
	city: string;
	age: number;

	canTeach: CardTag[];
	wantToLearn: CardTag[];

	onMoreClick?: () => void;
	onLikeClick?: () => void;
	isLiked?: boolean;
}
