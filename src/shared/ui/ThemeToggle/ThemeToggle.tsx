import sunIcon from '../../assets/icons/sun.svg';
import moonIcon from '../../assets/icons/moon.svg';
import styles from './ThemeToggle.module.scss';
import type { TThemeToggleProps } from './ThemeToggle.types';

export const ThemeToggle = ({ theme, onClick }: TThemeToggleProps) => {
	const classes = [
		styles.button,
		theme === 'dark' ? styles.dark : styles.light,
	].join(' ');
	const aria =
		theme === 'dark'
			? 'Переключить на светлую тему'
			: 'Переключить на тёмную тему';

	return (
		<button
			type="button"
			className={classes}
			aria-label={aria}
			onClick={onClick}
		>
			<img
				src={theme === 'dark' ? moonIcon : sunIcon}
				alt=""
				aria-hidden="true"
				width={24}
				height={24}
			/>
		</button>
	);
};
