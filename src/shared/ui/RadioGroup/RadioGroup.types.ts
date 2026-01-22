export type TRadioOption = {
	value: string;
	label: string;
};

export type TRadioGroupProps = {
	options: TRadioOption[];
	onChange?: (value: string) => void;
	name: string;
	value?: string;
	className?: string;
};
