import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import style from './ProfileModal.module.scss';
import type { ProfileModalProps } from './ProfileModal.types';
import logoutIcon from '../../assets/icons/logout.svg';
import { Link } from 'react-router-dom';

export const ProfileModal: FC<ProfileModalProps> = ({
	isOpen,
	onClose,
	onProfileClick,
	onLogout,
}) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		const handleClickOutside = (event: MouseEvent) => {
			// Если клик был вне модалки и модалка открыта - закрываем
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node) &&
				isOpen
			) {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	const handleProfileClick = () => {
		if (onProfileClick) {
			onProfileClick();
		} else {
			console.log('Переход в личный кабинет');
		}
		onClose();
	};

	const handleLogout = () => {
		if (onLogout) {
			onLogout();
		} else {
			localStorage.removeItem('skillswap:currentUser');
			console.log('Выход из аккаунта');
		}
		onClose();
	};

	if (!isOpen) return null;

	return (
		<>
			{/* Модалка с ref для отслеживания кликов */}
			<div ref={modalRef} className={style.modal}>
				<Link to="/profile">
					<button className={style.button} onClick={handleProfileClick}>
						Личный кабинет
					</button>
				</Link>
				<button
					className={`${style.button} ${style.danger}`}
					onClick={handleLogout}
				>
					Выйти из аккаунта
					<img src={logoutIcon} alt="Выйти" className={style.icon} />
				</button>
			</div>
		</>
	);
};
