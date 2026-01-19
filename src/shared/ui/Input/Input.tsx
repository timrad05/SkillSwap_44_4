import type { InputProps } from './Input.types';
import cls from './Input.module.scss';

export const Input = ({
	className = '',
	error = false,
	errorText,
	disabled = false,
	...props
}: InputProps) => {
	return (
		<div
			className={`${cls.root} ${error ? cls.error : ''} ${disabled ? cls.disabled : ''} ${className}`}
		>
			<div className={cls.control}>
				<input
					{...props}
					disabled={disabled}
					aria-invalid={error || undefined}
					className={cls.input}
				/>
			</div>
			{errorText ? <div className={cls['error-text']}>{errorText}</div> : null}
		</div>
	);
};
