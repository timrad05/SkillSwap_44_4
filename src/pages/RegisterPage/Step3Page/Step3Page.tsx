import React from 'react';
import { Header } from '../../../widgets/Header';
import { ProgressBar } from '../../../widgets/ProgressBar/ProgressBar';
import { Step3Form } from '../../../features/auth/registration/ui/Step3Form';
import { Info } from '../../../shared/ui/Info';
import type { step3FormData } from '../../../features/auth/registration/ui/Step3Form/Step3Form.types';
import type { Step3PageProps } from './Step3Page.types';
import styles from './Step3Page.module.scss';

export const Step3Page: React.FC<Step3PageProps> = ({
	headerProps = {},
	progressBarProps = {
		step: 3,
	},
	step3FormProps = {},
	infoProps = {
		title: 'Укажите, чем вы готовы поделиться',
		text: 'Так другие люди смогут увидеть ваши предложения и предложить вам обмен!',
		image: '/src/shared/assets/images/school-board.png',
	},
	onSubmit = () => {},
}) => {
	const handleSubmit = (data: step3FormData) => {
		console.log('Form submitted:', data);
		onSubmit(data);
	};

	const step3FormMergedProps = {
		...step3FormProps,
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
					<Step3Form {...step3FormMergedProps} />
				</div>

				<div className={styles.info}>
					<Info {...infoProps} />
				</div>
			</main>
		</div>
	);
};
