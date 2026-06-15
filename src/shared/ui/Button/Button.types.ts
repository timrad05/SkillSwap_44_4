import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: ButtonVariant;
	disabled?: boolean;
	type?: 'submit' | 'reset' | 'button' | undefined;
}
