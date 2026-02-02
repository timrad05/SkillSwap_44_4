import { useState } from 'react';
import type { LoginFormProps } from './LoginForm.types';
import { InputField } from '../../../../../shared/ui/InputField';
import { Button } from '../../../../../shared/ui/Button';
import cls from './LoginForm.module.scss';

import AppleIcon from '../../../../../shared/assets/icons/Apple.svg';
import GoogleIcon from '../../../../../shared/assets/icons/Google.svg';
import { Link } from 'react-router-dom';

export const LoginForm = ({ className = '' }: LoginFormProps) => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const handleInputChange =
		(field: keyof typeof formData) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData((prev) => ({
				...prev,
				[field]: e.target.value,
			}));

			if (errors[field]) {
				setErrors((prev) => ({
					...prev,
					[field]: '',
				}));
			}
		};

	const handleBlur = (field: keyof typeof formData) => () => {
		if (!formData[field]) {
			setErrors((prev) => ({
				...prev,
				[field]:
					field === 'email'
						? 'Email обязателен для заполнения'
						: 'Пароль обязателен для заполнения',
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {
			email: '',
			password: '',
		};

		if (!formData.email) {
			newErrors.email = 'Email обязателен для заполнения';
		}

		if (!formData.password) {
			newErrors.password = 'Пароль обязателен для заполнения';
		}

		setErrors(newErrors);
		return !newErrors.email && !newErrors.password;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			return;
		}

		console.log('Form submitted:', formData);
	};

	return (
		<form className={`${cls.form} ${className}`} onSubmit={handleSubmit}>
			{/* Социальные кнопки */}
			<div className={cls.socials}>
				<button type="button" className={cls['social-button']}>
					<img src={GoogleIcon} alt="Google" />
					Продолжить с Google
				</button>

				<button type="button" className={cls['social-button']}>
					<img src={AppleIcon} alt="Apple" />
					Продолжить с Apple
				</button>
			</div>

			{/* Разделитель */}
			<div className={cls.divider}>
				<span>или</span>
			</div>

			{/* Поля */}
			<div className={cls.fields}>
				<InputField
					label="Email"
					placeholder="Введите email"
					value={formData.email}
					onChange={handleInputChange('email')}
					onBlur={handleBlur('email')}
					required
					error={!!errors.email}
					errorText={errors.email}
					id="email-input"
				/>

				<InputField
					label="Пароль"
					placeholder="Введите ваш пароль"
					type="password"
					variant="password"
					value={formData.password}
					onChange={handleInputChange('password')}
					onBlur={handleBlur('password')}
					required
					error={!!errors.password}
					errorText={errors.password}
					id="password-input"
				/>
			</div>

			{/* Кнопки */}
			<div className={cls.buttons}>
				<Button type="submit" variant="primary">
					Войти
				</Button>

				<Link to="/registration/step1">
					<button type="button" className={cls['register-button']}>
						Зарегистрироваться
					</button>
				</Link>
			</div>
		</form>
	);
};
