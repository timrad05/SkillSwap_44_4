import styles from './CheckBox.module.scss';
import type { TCheckBoxProps } from './CheckBox.types';

export const CheckBox = ({
	option,
	checked = false,
	isDisabled = false,
	hasSubcategories = false,
	isParent = false,
	onToggle,
	className = '',
}: TCheckBoxProps) => {
	const handleClick = () => {
		if (!isDisabled && onToggle) {
			onToggle(option.value);
		}
	};

	const checkboxId = `checkbox-${option.value}`;

	let iconClass = styles['icon-empty'];
	if (checked) {
		if (isParent && hasSubcategories) {
			iconClass = styles['icon-remove'];
		} else {
			iconClass = styles['icon-done'];
		}
	}

	return (
		<div className={`${styles['checkbox-wrapper']} ${className}`}>
			<input
				type="checkbox"
				id={checkboxId}
				checked={checked}
				disabled={isDisabled}
				onChange={handleClick}
				className={styles['checkbox-input']}
				aria-checked={checked}
				aria-disabled={isDisabled}
			/>
			<label
				htmlFor={checkboxId}
				className={`${styles['checkbox-label']} ${
					isDisabled ? styles.disabled : ''
				}`}
			>
				<span className={styles['checkbox-icon']}>
					<div className={`${styles['icon-mask']} ${iconClass}`} />
				</span>
				<span className={styles['checkbox-text']}>{option.label}</span>
			</label>
		</div>
	);
};
