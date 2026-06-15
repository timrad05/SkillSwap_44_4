import type { InputProps } from './Input.types';
import cls from './Input.module.scss';
import eyeIcon from '../../assets/icons/eye.svg';
import eyeSlashIcon from '../../assets/icons/eye-slash.svg';
import editIcon from '../../assets/icons/edit.svg';
import { useState } from 'react';

export const Input = ({
	className = '',
	variant = 'default',
	error = false,
	errorText,
	disabled = false,
	...props
}: InputProps) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const hasIcon = variant === 'password' || variant === 'change';
	const inputType =
		variant === 'password'
			? isPasswordVisible
				? 'text'
				: 'password'
			: props.type;

	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prev) => !prev);
	};

	return (
		<div
			className={`${cls.root} ${error ? cls.error : ''} ${disabled ? cls.disabled : ''} ${className}`}
		>
			<div className={cls.control}>
				<input
					{...props}
					type={inputType}
					disabled={disabled}
					aria-invalid={error || undefined}
					className={`${cls.input} ${hasIcon ? cls['input-with-icon'] : ''}`}
				/>
				{variant === 'password' ? (
					<button
						type="button"
						className={cls['icon-button']}
						onClick={togglePasswordVisibility}
						disabled={disabled}
						aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
					>
						<img
							src={isPasswordVisible ? eyeSlashIcon : eyeIcon}
							alt=""
							aria-hidden="true"
							className={cls['icon-img']}
						/>
					</button>
				) : null}
				{variant === 'change' ? (
					<div className={cls.icon} aria-hidden="true">
						<img src={editIcon} alt="" className={cls['icon-img']} />
					</div>
				) : null}
			</div>
			{errorText ? <div className={cls['error-text']}>{errorText}</div> : null}
		</div>
	);
};
