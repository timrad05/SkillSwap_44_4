import type { TMenuItemProps } from './MenuItem.types';
import styles from './MenuItem.module.css';
import { NavLink } from 'react-router-dom';

export const MenuItem = ({ label, to, onClick, className }: TMenuItemProps) => {
	if (to) {
		return (
			<NavLink to={to} className={`${styles.item} ${className}`}>
				<span className={styles.label}>{label}</span>
			</NavLink>
		);
	}
	return (
		<button onClick={onClick} className={`${styles.item} ${className}`}>
			<span className={styles.label}>{label}</span>
		</button>
	);
};
