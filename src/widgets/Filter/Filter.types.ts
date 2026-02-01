import type {
	ISkillCategory,
	ISkillSubcategory,
} from '../../entities/skill/model/types';

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
	categories?: ISkillCategory[];
	subcategories?: ISkillSubcategory[];
	onReset?: () => void;
};
