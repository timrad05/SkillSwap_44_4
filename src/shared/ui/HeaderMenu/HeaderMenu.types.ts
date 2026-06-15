import type { TMenuItemProps } from '../MenuItem';

export type THeaderMenuItem = Pick<TMenuItemProps, 'label' | 'to' | 'icon'> & {
	id: string;
};

export type THeaderMenuProps = {
	items: THeaderMenuItem[];
	onSelect?: (id: string) => void;
	className?: string;
};
