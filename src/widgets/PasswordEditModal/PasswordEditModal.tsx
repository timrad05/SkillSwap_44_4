import React, { useState, useEffect } from 'react';
import styles from './PasswordEditModal.module.scss';
import type { PasswordEditModalProps } from './PasswordEditModal.type';

import { Button } from '../../shared/ui/Button';
import { InputField } from '../../shared/ui/InputField';

export const PasswordEditModal: React.FC<PasswordEditModalProps> = ({
	isOpen,
	onClose,
	onSave,
}) => {
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (isOpen) {
			setPassword('');
			setError(undefined);
		}
	}, [isOpen]);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleSubmit = () => {
		setError(undefined);

		if (!password.trim()) {
			setError('Пожалуйста, введите новый пароль.');
			return;
		}

		if (password.length < 6) {
			setError('Пароль должен быть не менее 6 символов.');
			return;
		}

		onSave(password);
		onClose();
	};

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen) {
				onClose();
			}
		};
		window.addEventListener('keydown', handleEsc);
		return () => window.removeEventListener('keydown', handleEsc);
	}, [isOpen, onClose]);

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.currentTarget === e.target) {
			onClose();
		}
	};

	if (!isOpen) return null;

	return (
		<div
			className={styles['password-modal-overlay']}
			onClick={handleOverlayClick}
		>
			<div className={styles['password-modal']}>
				<h2 className={styles['modal-title']}>Изменить пароль</h2>
				<div className={styles['form-group']}>
					<InputField
						type="password"
						label="Новый пароль"
						errorText={error}
						error={error != undefined}
						value={password}
						onChange={handlePasswordChange}
						placeholder="Введите новый пароль"
						aria-label="Новый пароль"
						autoFocus
					/>
				</div>

				<div className={styles['button-group']}>
					<Button onClick={onClose} type="button" variant="secondary">
						Отмена
					</Button>
					<Button onClick={handleSubmit} type="submit">
						Сохранить
					</Button>
				</div>
			</div>
		</div>
	);
};
