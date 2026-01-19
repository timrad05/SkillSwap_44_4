import type { ReactNode } from 'react';

export interface LogoProps {
	name: string;
	icon?: ReactNode;
	className?: string;
	size?: 'small' | 'medium' | 'large';
}
