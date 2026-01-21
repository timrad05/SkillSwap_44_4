import React, { useState } from 'react';
import clsx from 'clsx';
import './DropDown.scss';
import type { DropDownProps } from './DropDown.types';

export const DropDown: React.FC<DropDownProps> = ({
	options,
	value,
	onChange,
	placeholder = '',
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
		<div className={clsx('dropdown', { open: isOpen })}>
			{' '}
			<button
				type="button"
				className={clsx('trigger', { disabled: disabled })}
				onClick={handleTriggerClick}
				disabled={disabled}
			>
				<span className={selectedOption ? 'selected' : 'placeholder'}>
					{selectedOption ? selectedOption.label : placeholder}
				</span>
				<span className={clsx('icon', { open: isOpen })}>
					<svg
						width="16"
						height="8"
						viewBox="0 0 16 8"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.3101 7.93308C15.1347 7.93308 14.9593 7.86847 14.8209 7.73003L8.803 1.71214C8.35997 1.26911 7.64003 1.26911 7.197 1.71214L1.17912 7.73003C0.911451 7.99769 0.468416 7.99769 0.20075 7.73003C-0.0669166 7.46236 -0.0669166 7.01933 0.20075 6.75166L6.21863 0.733775C7.197 -0.244592 8.79377 -0.244592 9.78137 0.733775L15.7992 6.75166C16.0669 7.01933 16.0669 7.46236 15.7992 7.73003C15.6608 7.85924 15.4854 7.93308 15.3101 7.93308Z"
							fill="#253017"
						/>
					</svg>
				</span>
			</button>
			{isOpen && (
				<div className="menu">
					{options.map((option) => (
						<div
							key={option.value}
							className={clsx('option', {
								selected: option.value === value,
								disabled: option.disabled,
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
