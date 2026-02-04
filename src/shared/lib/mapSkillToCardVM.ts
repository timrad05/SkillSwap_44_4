import type {
	ISkillCategory,
	ISkillSubcategory,
} from '../../entities/skill/model/types';
import type { City } from '../../entities/city/model/types';
import type { TagColor } from '../ui/Tag/Tag.types';

type ById<T> = Record<number, T | undefined>;

type skillLike = {
	text: string;
	color: TagColor | undefined;
};

export type UserLike = {
	id: number;
	name?: string;
	avatar?: string;
	cityId?: number;
	dateOfBirth?: string;
	canTeach?: number[];
	wantToLearn?: number[];
	likes?: number;
};

export type SkillCardVM = {
	id: number;
	userName: string;
	cityName: string;
	age: number;
	avatar?: string;
	likes: number;
	canTeach: skillLike[];
	wantToLearn: skillLike[];
};

function categoryDataMap(
	subcategoryIds: number[],
	skillCategoryById: ById<ISkillCategory>,
	skillSubcategoryById: ById<ISkillSubcategory>,
): skillLike[] {
	const result: skillLike[] = subcategoryIds.map((i) => {
		const skillCategoryId: number | undefined =
			skillSubcategoryById[i]?.categoryId;
		if (skillCategoryId) {
			return {
				text: skillSubcategoryById[i]?.name || 'Без названия',
				color:
					(skillCategoryById[skillCategoryId]?.type as TagColor) || undefined,
			};
		} else return { text: 'Не определен', color: undefined };
	});
	return result;
}

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
	user: UserLike,
	citiesById: ById<City>,
	skillCategoryById: ById<ISkillCategory>,
	skillSubcategoryById: ById<ISkillSubcategory>,
): SkillCardVM => {
	const city = user?.cityId !== undefined ? citiesById[user.cityId] : undefined;
	const canTeach: skillLike[] =
		user.canTeach !== undefined
			? categoryDataMap(user.canTeach, skillCategoryById, skillSubcategoryById)
			: [];
	const wantToLearn: skillLike[] =
		user.wantToLearn !== undefined
			? categoryDataMap(
					user.wantToLearn,
					skillCategoryById,
					skillSubcategoryById,
				)
			: [];
	const age =
		user?.dateOfBirth !== undefined
			? getFullYears(user?.dateOfBirth)
			: undefined;

	return {
		id: user.id,
		userName: user?.name ?? 'Неизвестный пользователь',
		cityName: city?.name ?? '—',
		avatar: user?.avatar,
		age: age || 0,
		likes: user.likes || 0,
		canTeach: canTeach,
		wantToLearn: wantToLearn,
	};
};
