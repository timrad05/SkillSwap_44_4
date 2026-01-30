export interface SkillInfoProps {
	title: string;
	subtitle: string;
	description: string;
	buttonProps?: {
		text: string;
		onClick: () => void;
		variant?: 'primary' | 'secondary' | 'tertiary';
		isExchangeProposed?: boolean;
	};
}
