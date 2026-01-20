import clsx from 'clsx';
import { SidebarItem } from '../SidebarItem';
import styles from './SidebarMenu.module.scss';
import type { TSidebarMenuProps } from './SidebarMenu.types';

export const SidebarMenu = ({
	items,
	activeId,
	onSelect,
	className,
}: TSidebarMenuProps) => {
	return (
		<nav aria-label="Боковое меню" className={clsx(styles.menu, className)}>
			<ul className={styles.menu}>
				{items.map((item) => (
					<li key={item.id} className={styles['item-wrapper']}>
						<SidebarItem
							label={item.label}
							icon={item.icon}
							to={item.to}
							active={!item.to ? activeId === item.id : undefined}
							onClick={!item.to ? () => onSelect?.(item.id) : undefined}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
};
