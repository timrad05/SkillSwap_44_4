import { fetchJson } from './fetchJson';
import type { City } from '../entities/city/model/type';

export const getCities = (): Promise<City[]> => {
	return fetchJson<City[]>('/db/cities.json');
};
