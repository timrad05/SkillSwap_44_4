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
	avatar?: string;
	cityId?: number;
	dateOfBirth?: string;
};

export type CityLike = {
	id: number;
	name?: string;
};

export type SkillCardVM = {
	id: Id;
	title: string;
	age?: number;
	category?: string;
	userName: string;
	cityName: string;
	avatar?: string;
};

function getFullYears(birthDateStr: string): number | undefined {
	const birthDate = new Date(birthDateStr);
	if (isNaN(birthDate.getTime())) {
		return undefined;
	}
	const today = new Date();
	const currentYear = today.getFullYear();
	const birthYear = birthDate.getFullYear();

	// Предполагаемый возраст
	let years = currentYear - birthYear;

	// Проверяем, был ли день рождения в этом году
	const hasHadBirthdayThisYear =
		today.getMonth() > birthDate.getMonth() ||
		(today.getMonth() === birthDate.getMonth() &&
			today.getDate() >= birthDate.getDate());

	if (!hasHadBirthdayThisYear) {
		years--; // Ещё не было дня рождения — уменьшаем на 1
	}

	return years;
}

export const mapSkillToCardVM = (
	skill: SkillLike,
	usersById: ById<UserLike>,
	citiesById: ById<CityLike>,
): SkillCardVM => {
	const authorId = skill.userId ?? skill.authorId;
	const user = authorId !== undefined ? usersById[authorId] : undefined;
	const city = user?.cityId !== undefined ? citiesById[user.cityId] : undefined;
	const age =
		user?.dateOfBirth !== undefined
			? getFullYears(user?.dateOfBirth)
			: undefined;

	return {
		id: skill.id,
		title: skill.title,
		category: skill.category,
		userName: user?.name ?? 'Неизвестный пользователь',
		cityName: city?.name ?? '—',
		avatar: user?.avatar,
		age: age,
	};
};
