import React from 'react';
import styles from './Chip.module.scss';
// Импортируем иконку крестика
import crossIcon from '../../assets/icons/cross.svg';

import type { ChipProps } from './Chip.types';

export const Chip: React.FC<ChipProps> = ({
	label,
	onRemove,
	className = '',
}) => {
	const handleRemoveClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onRemove();
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			onRemove();
		}
	};

	return (
		<div className={`${styles.chip} ${className}`}>
			<span className={styles['chip-label']}>{label}</span>
			<button
				type="button"
				className={styles['chip-remove']}
				onClick={handleRemoveClick}
				onKeyDown={handleKeyDown}
				aria-label={`Удалить фильтр: ${label}`}
				tabIndex={0}
			>
				<img
					src={crossIcon}
					alt="Удалить"
					className={styles['chip-remove-icon']}
					width="12"
					height="12"
				/>
			</button>
		</div>
	);
};

export default Chip;
