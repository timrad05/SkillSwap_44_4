import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './DropDown.module.scss';
import type { DropDownProps } from './DropDown.types';

export const DropDown: React.FC<DropDownProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Выберите вариант',
	disabled = false,
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
					<svg
						width="12"
						height="12"
						viewBox="0 0 24 24"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M7 10l5 5 5-5z" />
					</svg>
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
