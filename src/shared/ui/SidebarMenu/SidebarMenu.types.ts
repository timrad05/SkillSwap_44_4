import type { ReactNode } from 'react';

export interface ISidebarMenuProps {
	/** Дополнительный className для корневого элемента */
	className?: string;
	/** Дети — массив SidebarItem */
	children: ReactNode;
	/** Опционально — активный id для управления состоянием (если нужно управлять извне) */
	activeId?: string | null;
	/** Callback при клике на любой пункт (можно использовать для управления activeId извне) */
	onItemClick?: (id: string) => void;
}
