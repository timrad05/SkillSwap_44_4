import { Header } from '../../widgets/Header';
import { ErrorMessage } from '../../widgets/ErrorMessage';
import { Footer } from '../../widgets/Footer';
import styles from './NotFoundPage.module.scss';
import type { NotFoundPageProps } from './NotFoundPage.types';

export const NotFoundPage = ({ className = '' }: NotFoundPageProps) => {
	// Меню для футера
	const footerMenuItems = [
		{ id: 'about', label: 'О проекте' },
		{ id: 'contact', label: 'Контакты' },
		{ id: 'privacy', label: 'Политика конфиденциальности' },
		{ id: 'skills', label: 'Все навыки' },
		{ id: 'blog', label: 'Блог' },
		{ id: 'terms', label: 'Пользовательское соглашение' },
	];

	const handleMenuItemSelect = (id: string) => {
		console.log(`Выбран пункт меню: ${id}`);
		// Здесь будет навигация по роутам
	};

	return (
		<div className={`${styles.page} ${className}`}>
			<Header
				isAuthorized={false}
				isAuthPage={false}
				className={styles.header}
			/>

			<main className={styles.main}>
				<ErrorMessage type="404" />
			</main>

			<Footer
				className={styles.footer}
				logoConfig={{
					name: 'SkillSwap',
					size: 'medium',
				}}
				menuItems={footerMenuItems}
				onMenuItemSelect={handleMenuItemSelect}
				copyrightYear={new Date().getFullYear()}
			/>
		</div>
	);
};
