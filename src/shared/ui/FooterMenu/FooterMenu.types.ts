import type { TMenuItemProps } from '../MenuItem';

export type TFooterMenuItem = Pick<TMenuItemProps, 'label' | 'to' | 'icon'> & {
	/** Уникальный ID элемента */
	id: string;
};

export type TFooterMenuProps = {
	/** Массив элементов меню */
	items: TFooterMenuItem[];
	/** Коллбек при выборе (только для button-mode) */
	onSelect?: (id: string) => void;
	/** Дополнительный className */
	className?: string;
};
