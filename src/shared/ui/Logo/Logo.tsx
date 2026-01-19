import type { FC } from 'react';
import clsx from 'clsx';
import type { LogoProps } from './Logo.types';
import styles from './Logo.module.scss';

export const Logo: FC<LogoProps> = ({
	name,
	icon,
	className,
	size = 'medium',
	...props
}) => {
	const sizeClasses = {
		small: styles.small,
		medium: styles.medium,
		large: styles.large,
	};

	return (
		<div className={clsx(styles.logo, sizeClasses[size], className)} {...props}>
			{icon && <div className={styles.icon}>{icon}</div>}
			<span className={styles.name}>{name}</span>
		</div>
	);
};
