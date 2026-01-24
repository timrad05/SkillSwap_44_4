import React, { useState } from 'react';
import clsx from 'clsx';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';
import styles from './DropDown.module.scss';
import type { DropDownProps } from './DropDown.types';

export const DropDown: React.FC<DropDownProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Не указан',
	disabled = false,
	label = 'Город',
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const selectedOption = options.find((opt) => opt.value === value);

	const handleTriggerClick = () => {
		if (!disabled) setIsOpen(!isOpen);
	};

	const handleOptionClick = (optionValue: string) => {
		const option = options.find((opt) => opt.value === optionValue);
		if (!option?.disabled) {
			onChange?.(optionValue);
			setIsOpen(false);
		}
	};

	return (
		<div className={clsx(styles.dropdown, { [styles.open]: isOpen })}>
			{label && <h3 className={styles.text}>{label}</h3>}
			<button
				type="button"
				className={clsx(styles.trigger, { [styles.disabled]: disabled })}
				onClick={handleTriggerClick}
				disabled={disabled}
			>
				<span className={selectedOption ? styles.selected : styles.placeholder}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<span className={clsx(styles.icon, { [styles.open]: isOpen })}>
					<img src={chevronDownIcon} alt="▼" className={styles.icon} />
				</span>
			</button>

			{isOpen && (
				<div className={styles.menu}>
					{options.map((option) => (
						<div
							key={option.value}
							className={clsx(styles.option, {
								[styles.selected]: option.value === value,
								[styles.disabled]: option.disabled,
							})}
							onClick={() => handleOptionClick(option.value)}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
