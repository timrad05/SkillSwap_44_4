export interface BirthDatePickerProps {
	value: string; // "дд.мм.гггг" или ""
	onChange: (formattedDate: string) => void;
	label?: string; // По умолчанию "Дата рождения"
	placeholder?: string; // По умолчанию "дд.мм.гггг"
	className?: string;
}
