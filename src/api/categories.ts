import { fetchJson } from '../../src/api/fetchJson';
import type { ISkillCategory } from '../entities/skill/model/types';

type CategoriesResponse = {
	categories: ISkillCategory[];
};

export async function getCategories(): Promise<ISkillCategory[]> {
	const data = await fetchJson<CategoriesResponse>('/db/skillCategories.json');
	return data.categories;
}
