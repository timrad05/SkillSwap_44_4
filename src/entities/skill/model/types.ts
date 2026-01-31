export interface Skill {
	id: number;
	category: string;
	categoryId: number;
	subcategory: string;
	subcategoryId: number;
	userId: number;
	title: string;
	description: string;
	createdAt: string;
	images: string[];
}

export interface ISkillCategory {
	id: number;
	name: string;
	type: string;
}

export interface ISkillSubcategory {
	id: number;
	name: string;
	categoryId: number;
}
