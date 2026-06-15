import clsx from 'clsx';
import type { FC } from 'react';
import { ErrorMessage } from '../../widgets/ErrorMessage';
import { Footer } from '../../widgets/Footer';
import { Header } from '../../widgets/Header';
import style from './ServerErrorPage.module.scss';
import type { ServerErrorPageProps } from './ServerErrorPage.types';

export const ServerErrorPage: FC<ServerErrorPageProps> = ({ className }) => {
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
			<ErrorMessage type="500" />
			<Footer menuItems={footerMenuItems} />
		</div>
	);
};
