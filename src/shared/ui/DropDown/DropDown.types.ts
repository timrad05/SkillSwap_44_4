export interface DropDownOption {
	value: string;
	label: string;
	disabled?: boolean;
}

export interface DropDownProps {
	options: DropDownOption[];
	value?: string;
	onChange?: (value: string) => void;
	placeholder?: string;
	disabled?: boolean;
	label?: string;
}
