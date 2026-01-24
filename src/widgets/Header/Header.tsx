import clsx from 'clsx';
import type { FC } from 'react';
import blankLikeIcon from '../../shared/assets/icons/blankLike.svg';
import notificationIcon from '../../shared/assets/icons/notification.svg';
import { Button } from '../../shared/ui/Button';
import { HeaderMenu } from '../../shared/ui/HeaderMenu';
import { HeaderProfile } from '../../shared/ui/HeaderProfile';
import { Logo } from '../../shared/ui/Logo';
import { Search } from '../../shared/ui/Search';
import { ThemeToggle } from '../../shared/ui/ThemeToggle';
import style from './Header.module.scss';
import type { HeaderProps } from './Header.types';

export const Header: FC<HeaderProps> = ({
	isAuthorized = false,
	isAuthPage = false,
	className,
}) => {
	const chevronDownIcon = (
		<svg viewBox="0 0 24 24" fill="none">
			<path
				d="M12 15.9354C11.3539 15.9354 10.7078 15.6862 10.2186 15.197L4.20075 9.17912C3.93308 8.91145 3.93308 8.46842 4.20075 8.20075C4.46842 7.93308 4.91145 7.93308 5.17912 8.20075L11.197 14.2186C11.64 14.6617 12.36 14.6617 12.803 14.2186L18.8209 8.20075C19.0885 7.93308 19.5316 7.93308 19.7992 8.20075C20.0669 8.46842 20.0669 8.91145 19.7992 9.17912L13.7814 15.197C13.2922 15.6862 12.6461 15.9354 12 15.9354Z"
				fill="currentColor"
			/>
		</svg>
	);

	const logoIcon = (
		<svg viewBox="0 0 24 24" fill="none">
			<path
				d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
				fill="white"
			/>
		</svg>
	);

	if (isAuthPage) {
		return (
			<header className={clsx(style.header, className)}>
				<Logo name="SkillSwap" icon={logoIcon} size="medium" />
				<Button variant="secondary" onClick={() => alert('Закрыть')}>
					Закрыть
				</Button>
			</header>
		);
	}

	return (
		<header className={clsx(style.header, className)}>
			<Logo name="SkillSwap" icon={logoIcon} size="medium" />
			<HeaderMenu
				items={[
					{ id: 'about', label: 'О проекте' },
					{ id: 'skills', label: 'Все навыки', icon: chevronDownIcon },
				]}
			/>
			<Search placeholder="Поиск..." />
			<ThemeToggle theme="light" />
			{isAuthorized ? (
				<>
					<Button onClick={() => alert('Уведомления')}>
						<img src={notificationIcon} alt="Уведомления" />
					</Button>
					<Button onClick={() => alert('Избранное')}>
						<img src={blankLikeIcon} alt="Избранное" />
					</Button>
					<HeaderProfile name="User" />
				</>
			) : (
				<>
					<Button variant="secondary">Войти</Button>
					<Button variant="primary">Зарегистрироваться</Button>
				</>
			)}
		</header>
	);
};
