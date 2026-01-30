export interface SkillEditProps {
	title: string;
	subtitle: string;
	description: string;
	images: string[];
	onEditClick: () => void;
	onDoneClick: () => void;
}
