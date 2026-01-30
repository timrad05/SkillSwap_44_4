import { fetchJson } from '../../../api/fetchJson';
import type { User } from '../model/types';

export const getUsers = (): Promise<User[]> => {
	return fetchJson<User[]>('/db/users.json');
};
