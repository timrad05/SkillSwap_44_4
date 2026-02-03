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
	onLabelClick,
	className = '',
	showChevron = false,
	isExpanded = false,
}: TCheckBoxProps & {
	showChevron?: boolean;
	isExpanded?: boolean;
}) => {
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();
		if (!isDisabled && onToggle) {
			onToggle(option.value, e);
		}
	};

	const handleLabelClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		const target = e.target as HTMLElement;
		const isCheckboxClick =
			target.closest(`.${styles['checkbox-icon']}`) ||
			target.closest(`.${styles['icon-mask']}`) ||
			target.closest(`.${styles['checkbox-input']}`);
		const isChevronClick =
			target.closest(`.${styles.chevron}`) ||
			target.closest(`.${styles['chevron-container']}`);

		if (isCheckboxClick) {
			if (!isDisabled && onToggle) {
				onToggle(option.value, e);
			}
		} else if (
			hasSubcategories &&
			(isChevronClick || !isCheckboxClick) &&
			onLabelClick
		) {
			onLabelClick(option.value, e);
		} else if (!isDisabled && onToggle) {
			onToggle(option.value, e);
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
