import type { MouseEventHandler, ReactNode } from 'react';

export type TMenuItemProps = {
	label: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	to?: string;
	className?: string;
	icon?: ReactNode;
};
