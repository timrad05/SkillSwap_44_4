import React from 'react';
import { Header } from '../../../widgets/Header';
import { ProgressBar } from '../../../widgets/ProgressBar/ProgressBar';
import { Step2Form } from '../../../features/auth/registration/ui/Step2Form';
import { Info } from '../../../shared/ui/Info';
import type { Step2PageProps } from './Step2Page.types';
import type { Step2FormData } from '../../../features/auth/registration/ui/Step2Form/Step2Form.types';
import styles from './Step2Page.module.scss';

export const Step2Page: React.FC<Step2PageProps> = ({
	headerProps = {},
	progressBarProps = {
		step: 2,
	},
	step2FormProps = {},
	infoProps = {
		title: 'Расскажите немного о себе',
		text: 'Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена',
		image: '/src/shared/assets/images/light-bulb.png',
	},
	onSubmit = () => {},
}) => {
	const handleSubmit = (data: Step2FormData) => {
		console.log('Step 2 form submitted:', data);
		onSubmit(data);
	};

	const step2FormMergedProps = {
		...step2FormProps,
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
					<Step2Form {...step2FormMergedProps} />
				</div>

				<div className={styles.info}>
					<Info {...infoProps} />
				</div>
			</main>
		</div>
	);
};
