// src\entities\skill\model\storageUtils.ts

import type { Skill } from './types';

// Ключ для черновика навыка
const SKILL_DRAFT_KEY = 'skillswap:skillDraft';

// Ключ для всех сохранённых навыков (массив)
const STORED_SKILLS_KEY = 'skillswap:skills';

/**
 * Безопасное получение данных из localStorage
 */
function safeGetItem<T>(key: string): T | null {
	try {
		const item = localStorage.getItem(key);
		if (item === null) return null;
		return JSON.parse(item) as T;
	} catch (error) {
		console.warn(
			`Ошибка парсинга JSON для ключа "${key}". Очищаем ключ.`,
			error,
		);
		localStorage.removeItem(key);
		return null;
	}
}

/**
 * Безопасная запись в localStorage
 */
function safeSetItem<T>(key: string, value: T): void {
	try {
		const jsonString = JSON.stringify(value);
		localStorage.setItem(key, jsonString);
	} catch (error) {
		console.error(`Ошибка записи в localStorage для ключа "${key}":`, error);
	}
}

/**
 * Получает черновик навыка
 */
export function getSkillDraft(): Partial<Skill> | null {
	return safeGetItem(SKILL_DRAFT_KEY);
}

/**
 * Обновляет черновик навыка частичными данными
 */
export function setSkillDraft(patch: Partial<Skill>): void {
	const draft = getSkillDraft() || {};
	const updated = { ...draft, ...patch };
	safeSetItem(SKILL_DRAFT_KEY, updated);
}

/**
 * Очищает черновик навыка
 */
export function clearSkillDraft(): void {
	localStorage.removeItem(SKILL_DRAFT_KEY);
}

/**
 * Получает все сохранённые навыки (массив)
 */
export function getSkills(): Skill[] {
	const skills = safeGetItem<Skill[]>(STORED_SKILLS_KEY);
	return Array.isArray(skills) ? skills : [];
}

/**
 * Добавляет новый навык в список
 */
export function addSkill(skill: Skill): void {
	const skills = getSkills();
	skills.push(skill);
	safeSetItem(STORED_SKILLS_KEY, skills);
}

/**
 * Получает навыки конкретного пользователя
 */
export function getUserSkills(userId: number): Skill[] {
	return getSkills().filter((skill) => skill.userId === userId);
}

/**
 * Очищает все сохранённые навыки (если нужно для тестов/отладки)
 */
export function clearAllSkills(): void {
	localStorage.removeItem(STORED_SKILLS_KEY);
}
