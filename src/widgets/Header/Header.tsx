import clsx from 'clsx';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import blankLikeIcon from '../../shared/assets/icons/blankLike.svg';
import crossIcon from '../../shared/assets/icons/cross.svg';
import notificationIcon from '../../shared/assets/icons/notification.svg';
import { Button } from '../../shared/ui/Button';
import { HeaderMenu } from '../../shared/ui/HeaderMenu';
import { HeaderProfile } from '../../shared/ui/HeaderProfile';
import { Logo } from '../../shared/ui/Logo';
import { Search } from '../../shared/ui/Search';
import { ThemeToggle } from '../../shared/ui/ThemeToggle';
import style from './Header.module.scss';
import type { HeaderProps } from './Header.types';
import { getCurrentUser } from '../../entities/user/model/storageUtils';
import { ProfileModal } from '../../shared/ui/ProfileModal';

const CURRENT_USER_KEY = 'skillswap:currentUser';

export const Header: FC<HeaderProps> = ({
	isAuthorized: propIsAuthorized,
	isAuthPage = false,
	className,
	searchProps,
	userName: propUserName,
	userAvatar: propUserAvatar,
}) => {
	const [internalIsAuthorized, setInternalIsAuthorized] =
		useState<boolean>(false);
	const [userName, setUserName] = useState<string>('User');
	const [userAvatar, setUserAvatar] = useState<string | undefined>(undefined);
	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false); // ДОБАВЛЕНО

	const checkAuthorization = () => {
		const currentUser = getCurrentUser();

		if (currentUser) {
			setInternalIsAuthorized(true);
			setUserName(currentUser.name || 'User');
			setUserAvatar(currentUser.avatar);
		} else {
			setInternalIsAuthorized(false);
			setUserName('User');
			setUserAvatar(undefined);
		}
	};

	useEffect(() => {
		let lastUserData = localStorage.getItem(CURRENT_USER_KEY);

		const checkForChanges = () => {
			const currentUserData = localStorage.getItem(CURRENT_USER_KEY);

			if (currentUserData !== lastUserData) {
				lastUserData = currentUserData;
				checkAuthorization();
			}
		};

		checkAuthorization();

		const interval = setInterval(checkForChanges, 500);

		const handleStorageChange = (event: StorageEvent) => {
			if (event.key === CURRENT_USER_KEY) {
				checkAuthorization();
			}
		};

		window.addEventListener('storage', handleStorageChange);

		return () => {
			clearInterval(interval);
			window.removeEventListener('storage', handleStorageChange);
		};
	}, []);

	const finalIsAuthorized = (() => {
		if (propIsAuthorized === false) return false;

		return internalIsAuthorized;
	})();
	const finalUserName = propUserName || userName;
	const finalUserAvatar = propUserAvatar || userAvatar;

	// ДОБАВЛЕНО: Обработчики для модалки
	const handleProfileClick = () => {
		setIsProfileModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsProfileModalOpen(false);
	};

	const handleProfileAction = () => {
		console.log('Переход в личный кабинет');
		// Здесь можно добавить навигацию:
		// navigate('/profile');
		setIsProfileModalOpen(false);
	};

	const handleLogoutAction = () => {
		localStorage.removeItem('skillswap:currentUser');
		console.log('Выход из аккаунта');
		// Здесь можно добавить навигацию:
		// navigate('/login');
		// window.location.reload(); // если нужно обновить страницу
		setIsProfileModalOpen(false);
	};

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
				<Link to="/">
					<Logo name="SkillSwap" icon={logoIcon} size="medium" />
				</Link>
				<Link to="/">
					<Button variant="secondary" className={clsx(style['close-button'])}>
						<p>Закрыть</p>
						<img src={crossIcon} alt="Закрыть" className={clsx(style.cross)} />
					</Button>
				</Link>
			</header>
		);
	}

	return (
		// ДОБАВЛЕНО: Обернули в Fragment чтобы модалка рендерилась рядом
		<>
			<header className={clsx(style.header, className)}>
				<Link to="/">
					<Logo name="SkillSwap" icon={logoIcon} size="medium" />
				</Link>

				<HeaderMenu
					items={[
						{ id: 'about', label: 'О проекте' },
						{ id: 'skills', label: 'Все навыки', icon: chevronDownIcon },
					]}
				/>

				<Search placeholder="Поиск..." {...searchProps} />

				{finalIsAuthorized ? (
					<div className={clsx(style['auth-buttons'])}>
						<ThemeToggle theme="dark" />
						<button
							className={clsx(style.icon)}
							onClick={() => alert('Уведомления')}
						>
							<img src={notificationIcon} alt="Уведомления" />
						</button>
						<button
							className={clsx(style.icon)}
							onClick={() => alert('Избранное')}
						>
							<img src={blankLikeIcon} alt="Избранное" />
						</button>
						{/* ИЗМЕНЕНО: Добавлен onClick и переданы обработчики */}
						<HeaderProfile
							name={finalUserName}
							avatar={finalUserAvatar}
							onClick={handleProfileClick}
						/>
					</div>
				) : (
					<>
						<ThemeToggle theme="dark" />
						<div className={clsx(style['un-auth-buttons'])}>
							<Link to="/login">
								<Button
									variant="secondary"
									className={clsx(style['header-button'])}
								>
									Войти
								</Button>
							</Link>
							<Link to="/registration/step1">
								<Button
									variant="primary"
									className={clsx(style['header-button'])}
								>
									Зарегистрироваться
								</Button>
							</Link>
						</div>
					</>
				)}
			</header>

			{/* ДОБАВЛЕНО: Рендерим модалку рядом с хедером */}
			{finalIsAuthorized && (
				<div style={{ position: 'relative', display: 'inline-block' }}>
					<ProfileModal
						isOpen={isProfileModalOpen}
						onClose={handleCloseModal}
						onProfileClick={handleProfileAction}
						onLogout={handleLogoutAction}
					/>
				</div>
			)}
		</>
	);
};
