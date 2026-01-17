import type { ButtonHTMLAttributes } from 'react';

export type ButtonExampleVariant = 'primary' | 'secondary';

export interface ButtonExampleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonExampleVariant;
}
