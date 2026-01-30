import type { Skill } from '../entities/model/types';
import { fetchJson } from './fetchJson';

export const getSkills = (): Promise<Skill[]> => {
	return fetchJson<{ skills: Skill[] }>('/db/skills.json').then(
		(response) => response.skills,
	);
};
