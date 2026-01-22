import type { TSidebarItemProps } from '../SidebarItem/SidebarItem.types';

export type TSidebarMenuItem = Pick<
	TSidebarItemProps,
	'label' | 'icon' | 'to'
> & {
	/** Уникальный ID элемента для активации (используется если нет to) */
	id: string;
};

export type TSidebarMenuProps = {
	/** Массив элементов меню */
	items: TSidebarMenuItem[];
	/** ID активного элемента (только если items без to) */
	activeId?: string;
	/** Callback при выборе элемента (только если items без to) */
	onSelect?: (id: string) => void;
	/** Дополнительный className для контейнера */
	className?: string;
};
