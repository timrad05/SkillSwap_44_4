import type { ButtonExampleProps } from './ButtonExample.types';
import cls from './ButtonExample.module.scss';

export const ButtonExample = ({
	children,
	variant = 'primary',
	className = '',
	...props
}: ButtonExampleProps) => {
	return (
		<button {...props} className={`${cls.button} ${cls[variant]} ${className}`}>
			{children}
		</button>
	);
};
