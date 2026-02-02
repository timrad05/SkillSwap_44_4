import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getUserDraft,
	setUserDraft,
} from '../../../../../entities/user/model/storageUtils';

export const useStep1Form = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		const draft = getUserDraft();
		if (draft?.email || draft?.password) {
			setFormData({
				email: draft.email || '',
				password: draft.password || '',
			});
		}
	}, []);

	const validateEmail = (email: string) => {
		if (!email) return 'Email обязателен для заполнения';
		if (!email.includes('@') || !email.includes('.'))
			return 'Некорректный формат email';
		return '';
	};

	const validatePassword = (password: string) => {
		if (!password) return 'Пароль обязателен для заполнения';
		if (password.length < 6)
			return 'Пароль должен содержать минимум 6 символов';
		return '';
	};

	const handleChange =
		(field: 'email' | 'password') =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setFormData((prev) => ({ ...prev, [field]: value }));
			setUserDraft({ [field]: value });

			const error =
				field === 'email' ? validateEmail(value) : validatePassword(value);
			setErrors((prev) => ({ ...prev, [field]: error }));
		};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const emailError = validateEmail(formData.email);
		const passwordError = validatePassword(formData.password);

		setErrors({ email: emailError, password: passwordError });

		if (emailError || passwordError) return;

		setUserDraft({
			email: formData.email,
			password: formData.password,
		});

		navigate('/registration/step2');
	};

	const isFormValid =
		!validateEmail(formData.email) && !validatePassword(formData.password);

	return {
		formData,
		errors,
		isFormValid,
		handleChange,
		handleSubmit,
	};
};
