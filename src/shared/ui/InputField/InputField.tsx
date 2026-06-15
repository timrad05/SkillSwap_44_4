// InputField.tsx
import type { InputFieldProps } from './InputField.types';
import { Input } from '../Input/Input';
import cls from './InputField.module.scss';

export const InputField = ({
	label,
	className = '',
	error = false,
	errorText,
	required = false,
	disabled = false,
	variant = 'default',
	hint = '',
	...inputProps
}: InputFieldProps) => {
	const hasError = error;

	return (
		<div className={`${cls.field} ${className}`}>
			{label && (
				<label
					className={`${cls.label} ${required ? cls.required : ''}`}
					htmlFor={inputProps.id}
				>
					{label}
				</label>
			)}

			<Input
				{...inputProps}
				errorText={errorText}
				variant={variant}
				error={hasError}
				disabled={disabled}
			/>

			{hint && !hasError && <div className={cls.hint}>{hint}</div>}
		</div>
	);
};
