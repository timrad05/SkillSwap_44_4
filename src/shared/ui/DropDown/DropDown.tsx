import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import chevronDownIcon from '../../assets/icons/chevron-down.svg';
import chevronUpIcon from '../../assets/icons/chevron-up.svg';
import styles from './DropDown.module.scss';
import type { DropDownProps } from './DropDown.types';
import chevronUpIcon from '../../assets/icons/chevron-up.svg';

export const DropDown: React.FC<DropDownProps> = ({
	options,
	value,
	onChange,
	placeholder = 'Не указан',
	disabled = false,
	label = 'Город',
	isOpen: externalIsOpen,
	onToggle,
	required,
}) => {
	const [internalIsOpen, setInternalIsOpen] = useState(false);

	const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
	const selectedOption = options.find((opt) => opt.value === value);

	const handleTriggerClick = () => {
		if (disabled) return;

		if (onToggle) {
			onToggle();
		} else {
			setInternalIsOpen(!isOpen);
		}
	};

	const handleOptionClick = (optionValue: string) => {
		const option = options.find((opt) => opt.value === optionValue);
		if (!option?.disabled) {
			onChange?.(optionValue);

			if (onToggle) {
				onToggle();
			} else {
				setInternalIsOpen(false);
			}
		}
	};

	useEffect(() => {
		if (!onToggle) {
			const handleClickOutside = (event: MouseEvent) => {
				const target = event.target as HTMLElement;
				if (!target.closest(`.${styles.dropdown}`)) {
					setInternalIsOpen(false);
				}
			};

			document.addEventListener('mousedown', handleClickOutside);
			return () => {
				document.removeEventListener('mousedown', handleClickOutside);
			};
		}
	}, [onToggle]);

	return (
		<div className={clsx(styles.dropdown, { [styles.open]: isOpen })}>
			{label && (
				<span
					className={clsx(
						styles.text,
						styles.label,
						required ? styles.required : '',
					)}
				>
					{label}
				</span>
			)}
			<button
				type="button"
				className={clsx(styles.trigger, { [styles.disabled]: disabled })}
				onClick={handleTriggerClick}
				disabled={disabled}
			>
				<span
					className={clsx(
						styles.text,
						selectedOption ? styles.selected : styles.placeholder,
					)}
				>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<span className={styles.icon}>
					<img
						src={isOpen ? chevronUpIcon : chevronDownIcon}
						alt={isOpen ? '▲' : '▼'}
						className={styles.icon}
					/>
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
							<span className={styles.text}>{option.label}</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
};
