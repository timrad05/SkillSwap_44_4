import React, { useState } from 'react';
import styles from './Search.module.scss';
import type { SearchProps } from './Search.types';
import searchIcon from '../../assets/icons/search.svg';
import crossIcon from '../../assets/icons/cross.svg';

export const Search = React.forwardRef<HTMLInputElement, SearchProps>(
	(props, ref) => {
		const {
			placeholder = 'Искать навык',
			value: propValue,
			onChange,
			onClear,
		} = props;

		const [localValue, setLocalValue] = useState<string>(propValue ?? '');

		const value = propValue !== undefined ? propValue : localValue;

		const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			if (onChange) {
				onChange(newValue);
			} else {
				setLocalValue(newValue);
			}
		};

		const handleClear = () => {
			if (onClear) {
				onClear();
			} else {
				if (propValue === undefined) {
					setLocalValue('');
				}
			}
			if (ref && typeof ref !== 'function') {
				ref.current?.focus();
			}
		};

		const hasValue = value.length > 0;

		return (
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<img src={searchIcon} alt="Search" className={styles.icon} />
				</div>
				<input
					ref={ref}
					type="text"
					className={styles.input}
					placeholder={placeholder}
					value={value}
					onChange={handleInputChange}
				/>
				{hasValue && (
					<button
						className={styles.button}
						onClick={handleClear}
						aria-label="Clear"
						type="button"
					>
						<img src={crossIcon} alt="Clear" className={styles.clearicon} />
					</button>
				)}
			</div>
		);
	},
);
