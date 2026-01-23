import type {
	InputVariant,
	InputProps as BaseInputProps,
} from '../Input/Input.types';

export interface InputFieldProps extends Omit<BaseInputProps, 'className'> {
	label?: string;
	className?: string;
	variant?: InputVariant;
	required?: boolean;
	error: boolean;
	errorText: string;
	hint?: string;
}
