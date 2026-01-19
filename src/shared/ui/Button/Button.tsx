import type { ButtonProps } from './Button.types';
import styles from './Button.module.scss';

export const Button = ({
	children,
	variant = 'primary',
	disabled = false,
	className = '',
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			disabled={disabled}
			className={`${styles.button} ${styles[variant]} ${className}`}
		>
			{children}
		</button>
	);
};
