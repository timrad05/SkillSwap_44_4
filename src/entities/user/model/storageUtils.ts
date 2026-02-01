import type { ICurrentUser, IRegistrationDraft, IStoredUser } from './types';

// Константы для ключей localStorage
const STORED_USERS_KEY = 'stored_users';
const USER_DRAFT_KEY = 'user_draft';
const CURRENT_USER_KEY = 'current_user';

/**
 * Безопасное получение данных из localStorage с обработкой ошибок парсинга
 * @param key Ключ для получения данных
 * @returns Данные или null в случае ошибки
 */

function safeGetItem<T>(key: string): T | null {
	try {
		const item = localStorage.getItem(key);
		if (item === null) return null;
		return JSON.parse(item) as T;
	} catch (error) {
		console.warn(
			`Ошибка парсинга JSON для ключа "${key}". Очищаем ключ. Ошибка:`,
			error,
		);
		localStorage.removeItem(key);
		return null;
	}
}

/**
 * Безопасная запись данных в localStorage
 * @param key Ключ для записи данных
 * @param value Данные для записи
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
 * Получает список всех зарегистрированных пользователей
 * @returns Массив пользователей или пустой массив при ошибке
 */
export function getUsers(): IStoredUser[] {
	const users = safeGetItem(STORED_USERS_KEY);
	return Array.isArray(users) ? users : [];
}

/**
 * Добавляет нового пользователя в хранилище
 * @param user Данные пользователя
 */
export function addUser(user: IStoredUser): void {
	const users = getUsers();
	users.push(user);
	safeSetItem(STORED_USERS_KEY, users);
}

/**
 * Получает черновик регистрации
 * @returns Черновик или null при отсутствии/ошибке
 */
export function getUserDraft(): IRegistrationDraft | null {
	return safeGetItem(USER_DRAFT_KEY);
}

/**
 * Обновляет черновик регистрации частичными данными
 * @param patch Частичные данные для обновления
 */
export function setUserDraft(patch: Partial<IRegistrationDraft>): void {
	const draft = getUserDraft() || {};
	const updatedDraft = { ...draft, ...patch };
	safeSetItem(USER_DRAFT_KEY, updatedDraft);
}

/**
 * Очищает черновик регистрации
 */
export function clearUserDraft(): void {
	localStorage.removeItem(USER_DRAFT_KEY);
}

/**
 * Получает текущего авторизованного пользователя
 * @returns Данные пользователя или null при отсутствии/ошибке
 */
export function getCurrentUser(): ICurrentUser | null {
	return safeGetItem(CURRENT_USER_KEY);
}

/**
 * Устанавливает текущего авторизованного пользователя
 * @param user Данные пользователя
 */
export function setCurrentUser(user: ICurrentUser): void {
	safeSetItem(CURRENT_USER_KEY, user);
}

/**
 * Очищает данные текущего пользователя (выход из аккаунта)
 */
export function clearCurrentUser(): void {
	localStorage.removeItem(CURRENT_USER_KEY);
}
