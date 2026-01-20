import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import styles from './SidebarItem.module.scss';
import type { TSidebarItemProps } from './SidebarItem.types';

export const SidebarItem = ({
	label,
	icon,
	active = false,
	onClick,
	to,
	className,
}: TSidebarItemProps) => {
	if (to) {
		return (
			<NavLink
				to={to}
				className={({ isActive }) =>
					clsx(styles.item, { [styles.active]: isActive }, className)
				}
				aria-current="page"
			>
				{icon && (
					<img
						src={icon}
						alt=""
						aria-hidden="true"
						width={24}
						height={24}
						className={styles.icon}
					/>
				)}
				<span className={styles.label}>{label}</span>
			</NavLink>
		);
	}

	return (
		<button
			type="button"
			className={clsx(styles.item, { [styles.active]: active }, className)}
			onClick={onClick}
			aria-current={active ? 'page' : undefined}
		>
			{icon && (
				<img
					src={icon}
					alt=""
					aria-hidden="true"
					width={24}
					height={24}
					className={styles.icon}
				/>
			)}
			<span className={styles.label}>{label}</span>
		</button>
	);
};
