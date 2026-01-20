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
		<div className={clsx(styles.menu, className)}>
			{items.map((item) => (
				<SidebarItem
					key={item.id}
					label={item.label}
					icon={item.icon}
					to={item.to}
					active={!item.to ? activeId === item.id : undefined}
					onClick={!item.to ? () => onSelect?.(item.id) : undefined}
				/>
			))}
		</div>
	);
};
