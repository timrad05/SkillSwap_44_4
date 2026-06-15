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
	onToggle?: (value: string, e?: React.MouseEvent | React.ChangeEvent) => void;
	onLabelClick?: (value: string, e?: React.MouseEvent) => void;
	className?: string;
	showChevron?: boolean;
	isExpanded?: boolean;
};
