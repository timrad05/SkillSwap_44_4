import styles from './CheckBox.module.scss';
import type { TCheckBoxProps } from './CheckBox.types';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';
import chevronUpIcon from '../../assets/icons/chevron-up.svg';

export const CheckBox = ({
	option,
	checked = false,
	isDisabled = false,
	hasSubcategories = false,
	isParent = false,
	onToggle,
	className = '',
	showChevron = false,
	isExpanded = false,
}: TCheckBoxProps & { showChevron?: boolean; isExpanded?: boolean }) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation(); // ← останавливаем всплытие
		if (!isDisabled && onToggle) {
			onToggle(option.value);
		}
	};

	const handleLabelClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation(); // ← ВАЖНО: останавливаем всплытие
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
		<div className={`${styles['checkbox-container']} ${className}`}>
			<input
				type="checkbox"
				id={checkboxId}
				checked={checked}
				disabled={isDisabled}
				onChange={handleInputChange}
				onClick={(e) => e.stopPropagation()}
				className={styles['checkbox-input']}
				aria-checked={checked}
				aria-disabled={isDisabled}
			/>
			<label
				htmlFor={checkboxId}
				className={`${styles['checkbox-label']} ${
					isDisabled ? styles.disabled : ''
				} ${isParent ? styles.parent : ''}`}
				onClick={handleLabelClick}
			>
				<span className={styles['checkbox-icon']}>
					<div className={`${styles['icon-mask']} ${iconClass}`} />
				</span>
				<span className={styles['checkbox-text']}>{option.label}</span>

				{/* Шеврон для родительских категорий */}
				{isParent && hasSubcategories && showChevron && (
					<span className={styles['chevron-container']}>
						<img
							src={isExpanded ? chevronUpIcon : chevronDownIcon}
							alt={isExpanded ? 'Свернуть' : 'Развернуть'}
							className={styles.chevron}
							width={16}
							height={16}
						/>
					</span>
				)}
			</label>
		</div>
	);
};
