import blankLikeIcon from '../../assets/icons/blankLike.svg';
import filledLikeIcon from '../../assets/icons/Like.svg';
import styles from './Like.module.scss';
import type { TLikeProps } from './Like.types';

export const Like = ({
	isActive = false,
	onClick,
	className = '',
}: TLikeProps) => {
	const classes = [
		styles.button,
		isActive ? styles.active : styles.default,
		className,
	]
		.filter(Boolean)
		.join(' ');

	const ariaLabel = isActive
		? 'Убрать отметку "Нравится"'
		: 'Отметить как "Нравится"';

	return (
		<button
			type="button"
			className={classes}
			aria-label={ariaLabel}
			onClick={onClick}
		>
			<img
				src={isActive ? filledLikeIcon : blankLikeIcon}
				alt=""
				aria-hidden="true"
				width={24}
				height={24}
				className={styles.icon}
			/>
		</button>
	);
};
