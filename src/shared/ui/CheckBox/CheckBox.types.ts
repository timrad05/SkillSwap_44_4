export type TCheckBoxOption = {
	value: string;
	label: string;
};

export type TCheckBoxProps = {
	option: TCheckBoxOption;
	checked?: boolean;
	isDisabled?: boolean;
	hasSubcategories?: boolean;
	isParent?: boolean;
	onToggle?: (value: string) => void;
	className?: string;
};
