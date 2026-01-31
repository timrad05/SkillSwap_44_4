export type TFilterProps = {
	onRadioGroupChange?: (value: string) => void;
	onCheckBoxToggle?: (value: string) => void;
	onGenderChange?: (value: string) => void;
	onCityToggle?: (value: string) => void;
	className?: string;
	selectedMode?: string;
	selectedGender?: string;
	selectedSkillIds?: string[];
	selectedCityIds?: string[];
};
