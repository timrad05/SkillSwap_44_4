import React from 'react';
import styles from './ProgressBar.module.scss';
import type { ProgressBarProps } from './ProgressBar.types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ step }) => {
	const stepLabels = ['1', '2', '3'];

	const getFillWidth = (index: number) => {
		const currentStep = step - 1;
		const itemIndex = index;

		if (itemIndex < currentStep) {
			return 100;
		} else if (itemIndex === currentStep) {
			return 100;
		} else {
			return 0;
		}
	};

	return (
		<div className={styles['progress-bar']}>
			<div className={styles['step-info']}>Шаг {step} из 3</div>

			<div className={styles['progress-container']}>
				{stepLabels.map((_, index) => {
					const isActive = index < step;

					return (
						<div key={index} className={styles['progress-item']}>
							<div
								className={`${styles['progress-line']} ${
									isActive
										? styles['progress-line-active']
										: styles['progress-line-non-active']
								}`}
							>
								<div
									className={styles['progress-fill']}
									style={{
										width: `${getFillWidth(index)}%`,
									}}
								/>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};
