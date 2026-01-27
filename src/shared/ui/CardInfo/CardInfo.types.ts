export interface CardInfoProps {
	avatar: string;
	name: string;
	city: string;
	age: number;
	onLikeClick?: () => void;
	isLiked?: boolean;
}
