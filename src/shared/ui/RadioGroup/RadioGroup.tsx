import emptyRadioIcon from '../../assets/icons/radiobutton-empty.svg';
import activeRadioIcon from '../..//assets/icons/radiobutton-active.svg';
import styles from './RadioGroup.module.scss';
import type { TRadioGroupProps, TRadioOption } from './RadioGroup.types';

export const RadioGroup = ({
	options,
	onChange,
	name,
	value,
	className = '',
}: TRadioGroupProps) => {
	const handleChange = (optionValue: string) => {
		if (onChange) {
			onChange(optionValue);
		}
	};

	return (
		<div className={`${styles['radio-group']} ${className}`}>
			{options.map((option: TRadioOption) => {
				const isSelected = value === option.value;
				const optionId = `${name}-${option.value}`;

				return (
					<label
						key={option.value}
						htmlFor={optionId}
						className={`${styles['radio-option']} ${
							isSelected ? styles.selected : styles.default
						}`}
					>
						<input
							type="radio"
							id={optionId}
							name={name}
							value={option.value}
							checked={isSelected}
							onChange={() => handleChange(option.value)}
							className={styles['radio-input']}
							aria-checked={isSelected}
						/>
						<span className={styles['radio-icon']}>
							<img
								src={isSelected ? activeRadioIcon : emptyRadioIcon}
								alt=""
								aria-hidden="true"
								width={20}
								height={20}
								className={styles.icon}
							/>
						</span>
						<span className={styles['radio-label']}>{option.label}</span>
					</label>
				);
			})}
		</div>
	);
};
