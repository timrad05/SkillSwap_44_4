import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './DropDown.module.css';
import type { DropDownProps } from './DropDown.types';

export const DropDown: React.FC<DropDownProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Выберите вариант',
	disabled = false,
	className,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const selectedOption = options.find((opt) => opt.value === value);

	const handleTriggerClick = () => {
		if (!disabled) {
			setIsOpen(!isOpen);
		}
	};

	const handleOptionClick = (optionValue: string) => {
		if (!options.find((opt) => opt.value === optionValue)?.disabled) {
			onChange?.(optionValue);
			setIsOpen(false);
		}
	};

	return (
		<div className={clsx(styles.dropdown, className)}>
			<button
				type="button"
				className={clsx(styles.trigger, { [styles.disabled]: disabled })}
				onClick={handleTriggerClick}
				disabled={disabled}
				aria-expanded={isOpen}
			>
				<span
					className={clsx({
						[styles.placeholder]: !selectedOption,
						[styles.selected]: selectedOption,
					})}
				>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<span className={clsx(styles.icon, { [styles.open]: isOpen })}>▼</span>
			</button>

			{isOpen && (
				<div className={styles.menu} role="listbox">
					{options.map((option) => (
						<div
							key={option.value}
							className={clsx(styles.option, {
								[styles.selected]: option.value === value,
								[styles.disabled]: option.disabled,
							})}
							onClick={() => handleOptionClick(option.value)}
							role="option"
							aria-selected={option.value === value}
							aria-disabled={option.disabled}
						>
							{option.label}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
