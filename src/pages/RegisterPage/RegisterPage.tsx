import React from 'react';
import { Header } from '../../widgets/Header';
import { ProgressBar } from '../../widgets/ProgressBar/ProgressBar';
import { Step1Form } from '../../features/auth/registration/ui/Step1Form';
import { Info } from '../../shared/ui/Info';
import type { RegisterPageProps } from './RegisterPage.types';
import type { Step1FormData } from '../../features/auth/registration/ui/Step1Form/Step1Form.types';
import styles from './RegisterPage.module.scss';

export const RegisterPage: React.FC<RegisterPageProps> = ({
	headerProps = {},
	progressBarProps = {
		step: 1,
	},
	step1FormProps = {},
	infoProps = {
		title: 'Добро пожаловать в SkillSwap!',
		text: 'Присоединяйся в SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
		image: '/src/shared/assets/images/light-bulb.png',
	},
	onSubmit = () => {},
}) => {
	const handleSubmit = (data: Step1FormData) => {
		console.log('Form submitted:', data);
		onSubmit(data);
	};

	const step1FormMergedProps = {
		...step1FormProps,
		onSubmit: handleSubmit,
	};

	return (
		<div className={styles.page}>
			<Header {...headerProps} />

			<div className={styles['progress-bar']}>
				<ProgressBar {...progressBarProps} />
			</div>
			<main className={styles.main}>
				<div className={styles.form}>
					<Step1Form {...step1FormMergedProps} />
				</div>

				<div className={styles.info}>
					<Info {...infoProps} />
				</div>
			</main>
		</div>
	);
};
