import type { Step1FormProps } from './Step1Form.types';
import { InputField } from '../../../../../shared/ui/InputField';
import { Button } from '../../../../../shared/ui/Button';
import cls from './Step1Form.module.scss';
import AppleIcon from '../../../../../shared/assets/icons/Apple.svg';
import GoogleIcon from '../../../../../shared/assets/icons/Google.svg';
import { useStep1Form } from './useStep1Form';

export const Step1Form = ({ className = '' }: Step1FormProps) => {
	const { formData, errors, isFormValid, handleChange, handleSubmit } =
		useStep1Form();

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
					onChange={handleChange('email')}
					required
					error={!!errors.email}
					errorText={errors.email}
					id="registration-email"
				/>

				<InputField
					label="Пароль"
					placeholder="Придумайте надёжный пароль"
					type="password"
					variant="password"
					value={formData.password}
					onChange={handleChange('password')}
					required
					error={!!errors.password}
					errorText={errors.password}
					id="registration-password"
				/>
			</div>

			{/* Кнопка */}
			<Button type="submit" variant="primary" disabled={!isFormValid}>
				Далее
			</Button>
		</form>
	);
};
