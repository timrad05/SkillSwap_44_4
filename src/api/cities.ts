import { fetchJson } from './fetchJson';
import type { City } from '../entities/city/model/types';

type CitiesResponse = {
	cities: City[];
};

export async function getCities(): Promise<City[]> {
	const data = await fetchJson<CitiesResponse>('/db/cities.json');
	return data.cities;
}
