import type { MouseEventHandler } from 'react';

export type TSidebarItemProps = {
	/** Текст элемента меню */
	label: string;
	/** Путь к иконке */
	icon: string;
	/** Активное состояние (выделенный пункт). Если используется to, игнорируется в пользу роутера */
	active?: boolean;
	/** Клик по элементу (только если нет to) */
	onClick?: MouseEventHandler<HTMLButtonElement>;
	/** Путь для навигации (если есть, рендерит как NavLink) */
	to?: string;
	/** Дополнительный className */
	className?: string;
};
