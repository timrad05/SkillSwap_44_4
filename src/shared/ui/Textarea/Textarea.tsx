import type { TextareaProps } from './Textarea.types';
import cls from './Textarea.module.scss';
import editIcon from '../../assets/icons/edit.svg';

export const Textarea = ({
	className = '',
	error = false,
	errorText,
	disabled = false,
	showIcon = false,
	...props
}: TextareaProps) => {
	return (
		<div
			className={`${cls.root} ${error ? cls.error : ''} ${disabled ? cls.disabled : ''} ${className}`}
		>
			<div className={cls.control}>
				<textarea
					{...props}
					disabled={disabled}
					aria-invalid={error || undefined}
					className={cls.textarea}
				/>
				{showIcon && (
					<div className={cls.icon}>
						<img src={editIcon} alt="Edit" className={cls.iconImg} />
					</div>
				)}
			</div>
			{errorText ? <div className={cls['error-text']}>{errorText}</div> : null}
		</div>
	);
};
