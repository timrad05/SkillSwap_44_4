export interface SearchProps {
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	onClear?: () => void;
}
