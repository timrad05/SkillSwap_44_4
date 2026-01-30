import type { Month } from 'date-fns';
import { ru } from 'date-fns/locale';
import { forwardRef, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../assets/icons/calendar.svg';
import ChevronDown from '../../assets/icons/chevron-down.svg';
import { Button } from '../Button';
import cls from './BirthDatePicker.module.scss';
import type { BirthDatePickerProps } from './BirthDatePicker.types';

interface CustomInputProps {
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: () => void;
	placeholder?: string;
}

const CustomDateInput = forwardRef<HTMLInputElement, CustomInputProps>(
	({ value, onChange, onClick, placeholder }, ref) => (
		<div className={cls['date-input-wrapper']} onClick={onClick}>
			<input
				ref={ref}
				type="text"
				placeholder={placeholder || 'дд.мм.гггг'}
				value={value || ''}
				onChange={onChange || (() => {})}
				className={cls['date-input']}
				readOnly
			/>
			<img src={CalendarIcon} alt="calendar" className={cls['calendar-icon']} />
		</div>
	),
);
CustomDateInput.displayName = 'CustomDateInput';

export const BirthDatePicker = ({
	value,
	onChange,
	label = 'Дата рождения',
	placeholder = 'дд.мм.гггг',
	className = '',
}: BirthDatePickerProps) => {
	const [tempBirthDate, setTempBirthDate] = useState<Date | null>(null);
	const [prevBirthDate, setPrevBirthDate] = useState<Date | null>(null);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const datePickerRef = useRef<HTMLDivElement>(null);

	const handleDatePickerOpen = () => {
		if (value) {
			const [day, month, year] = value.split('.').map(Number);
			if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
				const parsed = new Date(year, month - 1, day);
				if (!isNaN(parsed.getTime())) {
					setTempBirthDate(parsed);
					setPrevBirthDate(parsed);
					setIsDatePickerOpen(true);
					return;
				}
			}
		}
		setTempBirthDate(new Date());
		setPrevBirthDate(null);
		setIsDatePickerOpen(true);
	};

	const handleDateChange = (date: Date | null) => {
		setTempBirthDate(date);
	};

	const handleConfirmDate = () => {
		if (tempBirthDate) {
			const formatted = tempBirthDate.toLocaleDateString('ru-RU', {
				day: '2-digit',
				month: '2-digit',
				year: 'numeric',
			});
			onChange(formatted); // Передаём форматированную дату родителю
		}
		setIsDatePickerOpen(false);
	};

	const handleCancelDate = () => {
		setTempBirthDate(prevBirthDate);
		setIsDatePickerOpen(false);
	};

	const months = Array.from({ length: 12 }, (_, i) =>
		ru.localize.month(i as Month),
	);

	return (
		<div className={`${cls.wrapper} ${className}`}>
			<span className={cls.label}>{label}</span>
			<div ref={datePickerRef}>
				<DatePicker
					selected={tempBirthDate}
					onChange={handleDateChange}
					dateFormat="dd.MM.yyyy"
					locale={ru}
					placeholderText={placeholder}
					customInput={<CustomDateInput />}
					showPopperArrow={false}
					open={isDatePickerOpen}
					onInputClick={handleDatePickerOpen}
					onCalendarClose={() => {}}
					onClickOutside={() => {}}
					wrapperClassName={cls['date-picker-wrapper']}
					calendarClassName={cls['date-picker-calendar']}
					renderCustomHeader={({ date, changeYear, changeMonth }) => (
						<div className={cls['custom-header']}>
							{/* Месяц */}
							<div className={cls['month-select-wrapper']}>
								<button type="button" className={cls['select-trigger']}>
									<span>{ru.localize.month(date.getMonth() as Month)}</span>
									<img src={ChevronDown} alt="" className={cls.chevron} />
								</button>
								<select
									className={cls['hidden-select']}
									value={date.getMonth()}
									onChange={(e) => changeMonth(Number(e.target.value))}
									aria-label="Месяц"
								>
									{months.map((month, i) => (
										<option key={i} value={i}>
											{month}
										</option>
									))}
								</select>
							</div>
							{/* Год */}
							<div className={cls['year-select-wrapper']}>
								<button type="button" className={cls['select-trigger']}>
									<span>{date.getFullYear()}</span>
									<img src={ChevronDown} alt="" className={cls.chevron} />
								</button>
								<select
									className={cls['hidden-select']}
									value={date.getFullYear()}
									onChange={(e) => changeYear(Number(e.target.value))}
									aria-label="Год"
								>
									{Array.from(
										{ length: 100 },
										(_, i) => new Date().getFullYear() - i,
									).map((year) => (
										<option key={year} value={year}>
											{year}
										</option>
									))}
								</select>
							</div>
						</div>
					)}
					nextMonthButtonLabel=""
					previousMonthButtonLabel=""
					showMonthDropdown={false}
					showYearDropdown={false}
					shouldCloseOnSelect={false}
				>
					<div className={cls['footer-buttons']}>
						<Button
							type="button"
							variant="secondary"
							onClick={handleCancelDate}
							className={cls['cancel-button']}
						>
							Отменить
						</Button>
						<Button
							type="button"
							variant="primary"
							onClick={handleConfirmDate}
							className={cls['confirm-button']}
						>
							Выбрать
						</Button>
					</div>
				</DatePicker>
			</div>
		</div>
	);
};
