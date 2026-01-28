import { Button } from '../Button';
import type { SkillInfoProps } from './SkillInfo.types';
import styles from './SkillInfo.module.scss';

export const SkillInfo = ({
	title,
	subtitle,
	description,
	buttonProps,
}: SkillInfoProps) => {
	const { text, onClick, variant = 'primary' } = buttonProps;
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div className={styles.header}>
					<h1 className={styles.title}>{title}</h1>

					<div className={styles.subtitle}>{subtitle}</div>
				</div>

				<div className={styles.description}>{description}</div>
			</div>

			<Button variant={variant} onClick={onClick} className={styles.button}>
				{text}
			</Button>
		</div>
	);
};
