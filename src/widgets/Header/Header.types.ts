import type { ReactNode } from 'react';
import type { SearchProps } from '../../shared/ui/Search/Search.types';

export interface HeaderProps {
	isAuthorized?: boolean;
	isAuthPage?: boolean;
	className?: string;
	onClose?: () => void;
	children?: ReactNode; // для кастомизации, если нужно
	searchProps?: SearchProps;
}
