import type { ReactNode } from 'react';
export interface InfoProps {
	image: string;
	title: string;
	text: string;
	className?: string;
	children?: ReactNode;
}
