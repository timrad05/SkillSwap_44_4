export interface CardInfoProps {
	avatar: string;
	name: string;
	city: string;
	age: number;
	likes?: number;
	onLikeClick?: () => void;
	isLiked?: boolean;
	showLikeButton?: boolean;
}
