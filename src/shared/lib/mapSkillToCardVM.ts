export type Id = number;

export type ById<T> = Record<number, T | undefined>;

export type SkillLike = {
	id: number;
	title: string;
	category?: string;
	userId?: number;
	authorId?: number;
};

export type UserLike = {
	id: number;
	name?: string;
	avatarUrl?: string;
	cityId?: number;
};

export type CityLike = {
	id: number;
	name?: string;
};

export type SkillCardVM = {
	id: Id;
	title: string;
	category?: string;
	userName: string;
	cityName: string;
	avatar?: string;
};

export const mapSkillToCardVM = (
	skill: SkillLike,
	usersById: ById<UserLike>,
	citiesById: ById<CityLike>,
): SkillCardVM => {
	const authorId = skill.userId ?? skill.authorId;
	const user = authorId !== undefined ? usersById[authorId] : undefined;
	const city = user?.cityId !== undefined ? citiesById[user.cityId] : undefined;

	return {
		id: skill.id,
		title: skill.title,
		category: skill.category,
		userName: user?.name ?? 'Неизвестный пользователь',
		cityName: city?.name ?? '—',
		avatar: user?.avatarUrl,
	};
};
