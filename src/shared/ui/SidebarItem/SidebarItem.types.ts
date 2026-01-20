export type TSidebarItemProps = {
	/** Текст элемента меню */
	label: string;
	/** Путь к иконке */
	icon: string;
	/** Активное состояние (выделенный пункт) */
	active?: boolean;
	/** Клик по элементу */
	onClick?: () => void;
	/** Дополнительный className */
	className?: string;
};
