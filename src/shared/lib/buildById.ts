import type { City } from '../../entities/city/model/types';
import type { User } from '../../entities/user/model/types';

export const buildUsersById = (users: User[]) =>
	Object.fromEntries(users.map((u) => [u.id, u]));

export const buildCitiesById = (cities: City[]) =>
	Object.fromEntries(cities.map((c) => [c.id, c]));
