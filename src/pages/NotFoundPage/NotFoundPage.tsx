import clsx from 'clsx';
import type { FC } from 'react';
import { ErrorMessage } from '../../widgets/ErrorMessage';
import { Footer } from '../../widgets/Footer';
import { Header } from '../../widgets/Header';
import style from './NotFoundPage.module.scss';
import type { NotFoundPageProps } from './NotFoundPage.types';

export const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
	const footerMenuItems = [
		{ id: 'about', label: 'О проекте' },
		{ id: 'contact', label: 'Контакты' },
		{ id: 'privacy', label: 'Политика конфиденциальности' },
		{ id: 'skills', label: 'Все навыки' },
		{ id: 'blog', label: 'Блог' },
		{ id: 'terms', label: 'Пользовательское соглашение' },
	];

	return (
		<div className={clsx(style.page, className)}>
			<Header />
			<ErrorMessage type="404" />
			<Footer menuItems={footerMenuItems} />
		</div>
	);
};
