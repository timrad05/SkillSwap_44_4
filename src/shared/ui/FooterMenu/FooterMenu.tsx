import clsx from 'clsx';
import { MenuItem } from '../MenuItem';
import styles from './FooterMenu.module.scss';
import type { TFooterMenuProps } from './FooterMenu.types';

export const FooterMenu = ({
	items,
	onSelect,
	className,
}: TFooterMenuProps) => {
	return (
		<nav aria-label="Меню в футере" className={clsx(styles.menu, className)}>
			<ul className={styles.list}>
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
