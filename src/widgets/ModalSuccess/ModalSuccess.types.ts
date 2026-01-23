import type { ReactNode } from 'react';

export type TModalSuccessProps = {
	icon?: ReactNode;
	title: string;
	text: string;
	onClose?: () => void;
	className?: string;
};
