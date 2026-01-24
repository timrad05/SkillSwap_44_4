export interface FooterProps {
	copyrightYear?: number;
	className?: string;
	menuItems?: Array<{
		id: string;
		label: string;
		to?: string;
		icon?: React.ReactNode;
	}>;

	onMenuItemSelect?: (id: string) => void;
	logoConfig?: {
		name: string;
		icon?: React.ReactNode;
		size?: 'small' | 'medium' | 'large';
	};
}
