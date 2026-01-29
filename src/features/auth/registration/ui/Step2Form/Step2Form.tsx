import type { Month } from 'date-fns';
import { ru } from 'date-fns/locale';
import { forwardRef, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../../../../../shared/assets/icons/calendar.svg';
import ChevronDown from '../../../../../shared/assets/icons/chevron-down.svg';
import { Button } from '../../../../../shared/ui/Button';
import { DropDown } from '../../../../../shared/ui/DropDown';
import { InputField } from '../../../../../shared/ui/InputField';
import cls from './Step2Form.module.scss';
import type { Step2FormProps } from './Step2Form.types';

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

export const Step2Form = ({ className = '' }: Step2FormProps) => {
	const [formData, setFormData] = useState({
		name: '',
		birthDate: '' as string,
		gender: '',
		city: '',
		skillCategory: '',
		skillSubcategory: '',
	});

	const [tempBirthDate, setTempBirthDate] = useState<Date | null>(null);
	const [prevBirthDate, setPrevBirthDate] = useState<Date | null>(null);
	const [errors, setErrors] = useState({ name: '' });
	const [openDropdown, setOpenDropdown] = useState<string | null>(null);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

	const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
	const datePickerRef = useRef<HTMLDivElement>(null);

	const handleInputChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value,
			}));
			if (errors.name && field === 'name') {
				setErrors((prev) => ({ ...prev, name: '' }));
			}
		};

	const handleDropdownChange =
		(field: keyof typeof formData) => (value: string) => {
			setFormData((prev) => ({
				...prev,
				[field]: value,
			}));
			setOpenDropdown(null);
		};

	const handleDropdownToggle = (field: string) => {
		setOpenDropdown(openDropdown === field ? null : field);
	};

	const handleDatePickerOpen = () => {
		if (formData.birthDate) {
			const [day, month, year] = formData.birthDate.split('.').map(Number);
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
			setFormData((prev) => ({ ...prev, birthDate: formatted }));
		}
		setIsDatePickerOpen(false);
	};

	const handleCancelDate = () => {
		setTempBirthDate(prevBirthDate);
		setIsDatePickerOpen(false);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors = {
			name: formData.name ? '' : 'Имя обязательно для заполнения',
		};
		setErrors(newErrors);
		if (newErrors.name) return;
		console.log('Step 2 form submitted:', formData);
	};

	const handleBackClick = () => {
		console.log('Back button clicked');
	};

	const months = Array.from({ length: 12 }, (_, i) =>
		ru.localize.month(i as Month),
	);

	return (
		<form className={`${cls.form} ${className}`} onSubmit={handleSubmit}>
			<div className={cls.fields}>
				<InputField
					label="Имя"
					placeholder="Введите ваше имя"
					value={formData.name}
					onChange={handleInputChange('name')}
					required={true}
					error={!!errors.name}
					errorText={errors.name}
					id="name-input"
				/>

				<div className={cls['inline-fields']}>
					<div className={cls['inline-field']}>
						<span className={cls['dropdown-label']}>Дата рождения</span>
						<div ref={datePickerRef}>
							<DatePicker
								selected={tempBirthDate}
								onChange={handleDateChange}
								dateFormat="dd.MM.yyyy"
								locale={ru}
								placeholderText="дд.мм.гггг"
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
												<span>
													{ru.localize.month(date.getMonth() as Month)}
												</span>
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

					<div className={cls['inline-field']}>
						<label className={cls['dropdown-label']}>Пол</label>
						<div
							ref={(el) => {
								dropdownRefs.current.gender = el;
							}}
							onClick={() => handleDropdownToggle('gender')}
						>
							<DropDown
								options={[]}
								value={formData.gender}
								onChange={handleDropdownChange('gender')}
								placeholder="Не указан"
								label=""
								isOpen={openDropdown === 'gender'}
								onToggle={() => handleDropdownToggle('gender')}
							/>
						</div>
					</div>
				</div>

				<div className={cls['dropdown-field']}>
					<label className={cls['dropdown-label']}>Город</label>
					<div
						ref={(el) => {
							dropdownRefs.current.city = el;
						}}
						onClick={() => handleDropdownToggle('city')}
					>
						<DropDown
							options={[]}
							value={formData.city}
							onChange={handleDropdownChange('city')}
							placeholder="Не указан"
							label=""
							isOpen={openDropdown === 'city'}
							onToggle={() => handleDropdownToggle('city')}
						/>
					</div>
				</div>

				<div className={cls['dropdown-field']}>
					<label className={cls['dropdown-label']}>
						Категория навыка, которому хотите научиться
					</label>
					<div
						ref={(el) => {
							dropdownRefs.current.skillCategory = el;
						}}
						onClick={() => handleDropdownToggle('skillCategory')}
					>
						<DropDown
							options={[]}
							value={formData.skillCategory}
							onChange={handleDropdownChange('skillCategory')}
							placeholder="Выберите категорию"
							label=""
							isOpen={openDropdown === 'skillCategory'}
							onToggle={() => handleDropdownToggle('skillCategory')}
						/>
					</div>
				</div>

				<div className={cls['dropdown-field']}>
					<label className={cls['dropdown-label']}>
						Подкатегория навыка, которому хотите научиться
					</label>
					<div
						ref={(el) => {
							dropdownRefs.current.skillSubcategory = el;
						}}
						onClick={() => handleDropdownToggle('skillSubcategory')}
					>
						<DropDown
							options={[]}
							value={formData.skillSubcategory}
							onChange={handleDropdownChange('skillSubcategory')}
							placeholder="Выберите подкатегорию"
							label=""
							isOpen={openDropdown === 'skillSubcategory'}
							onToggle={() => handleDropdownToggle('skillSubcategory')}
						/>
					</div>
				</div>
			</div>

			<div className={cls.buttons}>
				<Button
					type="button"
					variant="secondary"
					onClick={handleBackClick}
					className={cls['button-back']}
				>
					Назад
				</Button>
				<Button
					type="submit"
					variant="primary"
					className={cls['button-continue']}
				>
					Продолжить
				</Button>
			</div>
		</form>
	);
};
