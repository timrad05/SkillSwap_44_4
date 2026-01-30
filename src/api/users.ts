import { fetchJson } from '../../src/api/fetchJson';
import type { User } from '../../src/entities/user/model/types';

type UsersResponse = {
	users: User[];
};

export async function getUsers(): Promise<User[]> {
	const data = await fetchJson<UsersResponse>('/db/users.json');
	return data.users;
}
