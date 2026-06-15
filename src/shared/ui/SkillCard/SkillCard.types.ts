export interface SkillCardProps {
	cardInfo: {
		avatar: string;
		name: string;
		city: string;
		age: number;
	};

	description: string;

	canTeach: Array<{
		text: string;
		color?: string;
	}>;

	wantsToLearn: Array<{
		text: string;
		color?: string;
	}>;
}
