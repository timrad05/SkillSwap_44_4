import clsx from 'clsx';
import { MenuItem } from '../MenuItem';
import type { THeaderMenuProps } from './HeaderMenu.types';
import styles from './HeaderMenu.module.scss';

export const HeaderMenu = ({
	items,
	onSelect,
	className,
}: THeaderMenuProps) => {
	return (
		<nav aria-label="Меню в заголовке" className={clsx(styles.menu, className)}>
			<ul className={styles.menu}>
				{items.map((item) => (
					<li key={item.id} className={styles['item-wrapper']}>
						<MenuItem
							label={item.label}
							to={item.to}
							onClick={!item.to ? () => onSelect?.(item.id) : undefined}
							icon={item.icon}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
};
