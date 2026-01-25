// LoginForm.tsx
import { useState } from 'react';
import type { LoginFormProps } from './LoginForm.types';
import { InputField } from '../../../../../shared/ui/InputField';
import { Button } from '../../../../../shared/ui/Button';
import cls from './LoginForm.module.scss';

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
				[field]: `${field === 'email' ? 'Email' : 'Пароль'} обязателен для заполнения`,
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
		return newErrors.email === '' && newErrors.password === '';
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const isValid = validateForm();

		if (!isValid) {
			return;
		}

		// Тут будет логика отправки формы
		console.log('Form submitted:', formData);
	};

	const handleRegisterClick = () => {
		console.log('Register button clicked');
		// Тут будет переход к регистрации
	};

	return (
		<form className={`${cls.form} ${className}`} onSubmit={handleSubmit}>
			<div className={cls.fields}>
				<InputField
					label="Email"
					placeholder="Введите email"
					value={formData.email}
					onChange={handleInputChange('email')}
					onBlur={handleBlur('email')}
					required={true}
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
					required={true}
					error={!!errors.password}
					errorText={errors.password}
					id="password-input"
				/>
			</div>

			<div className={cls.buttons}>
				<Button type="submit" variant="primary">
					Войти
				</Button>

				<button
					type="button"
					className={cls['register-button']}
					onClick={handleRegisterClick}
				>
					Зарегистрироваться
				</button>
			</div>
		</form>
	);
};
