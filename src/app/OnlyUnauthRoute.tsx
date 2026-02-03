import { type ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// Импортируем именно ту функцию, которую мы нашли в storageUtils
import { getCurrentUser } from '../entities/user/model/storageUtils';

interface Props {
	component: ReactElement;
}

export const OnlyUnauthRoute = ({ component }: Props) => {
	const location = useLocation();

	// Проверяем наличие currentUser
	const currentUser = getCurrentUser();

	if (currentUser) {
		// Если пользователь уже авторизован, отправляем его на главную
		// replace: true — чтобы он не мог вернуться назад на форму входа
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	// Если пользователя нет — показываем LoginPage или шаги регистрации
	return component;
};
