import type { TMenuItemProps } from './MenuItem.types';
import styles from './MenuItem.module.scss';
import { NavLink } from 'react-router-dom';

export const MenuItem = ({
	label,
	to,
	onClick,
	className,
	icon,
}: TMenuItemProps) => {
	if (to) {
		return (
			<NavLink to={to} className={`${styles.item} ${className}`}>
				<span className={styles.label}>{label}</span>
				{icon && <div className={styles.icon}>{icon}</div>}
			</NavLink>
		);
	}
	return (
		<button onClick={onClick} className={`${styles.item} ${className}`}>
			<span className={styles.label}>{label}</span>
			{icon && <div className={styles.icon}>{icon}</div>}
		</button>
	);
};
