import type { InputHTMLAttributes } from 'react';

export type InputVariant = 'default' | 'password' | 'change';

export interface InputProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size'
> {
	variant?: InputVariant;
	error?: boolean;
	errorText?: string;
}
