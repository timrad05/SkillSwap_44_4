import { fetchJson } from '../../src/api/fetchJson';
import type { ISkillSubcategory } from '../entities/skill/model/types';

type SubcategoriesResponse = {
	subcategories: ISkillSubcategory[];
};

export async function getSubcategories(): Promise<ISkillSubcategory[]> {
	const data = await fetchJson<SubcategoriesResponse>(
		'/db/skillSubcategories.json',
	);
	return data.subcategories;
}
