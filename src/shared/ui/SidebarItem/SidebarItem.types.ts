export type TSidebarItemProps = {
	label: string; /** Текст элемента меню */
	icon: string; /** Путь к иконке */
	active?: boolean; /** Активное состояние (выделенный пункт) */
	onClick?: () => void; /** Клик по элементу */
	className?: string; /** Дополнительный className */
};
