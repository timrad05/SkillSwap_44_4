import type { ReactNode } from 'react';

export interface HeaderProps {
	isAuthorized?: boolean;
	isAuthPage?: boolean;
	className?: string;
	onClose?: () => void;
	children?: ReactNode; // для кастомизации, если нужно
}
