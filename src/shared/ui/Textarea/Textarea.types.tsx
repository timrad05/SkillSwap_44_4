import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends Omit<
	TextareaHTMLAttributes<HTMLTextAreaElement>,
	'size'
> {
	error?: boolean;
	errorText?: string;
	showIcon?: boolean;
	required?: boolean;
	label?: string;
	placeholder?: string;
}
