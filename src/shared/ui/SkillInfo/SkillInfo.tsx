import { Button } from '../Button';
import clockIcon from '../../assets/icons/clock.svg';
import type { SkillInfoProps } from './SkillInfo.types';
import styles from './SkillInfo.module.scss';

export const SkillInfo = ({
	title,
	subtitle,
	description,
	buttonProps,
}: SkillInfoProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<div className={styles.header}>
					<h1 className={styles.title}>{title}</h1>
					<div className={styles.subtitle}>{subtitle}</div>
				</div>
				<div className={styles.description}>{description}</div>
			</div>

			{buttonProps && <SkillInfoButton {...buttonProps} />}
		</div>
	);
};

interface SkillInfoButtonProps {
	text: string;
	onClick: () => void;
	variant?: 'primary' | 'secondary' | 'tertiary';
	isExchangeProposed?: boolean;
}

const SkillInfoButton: React.FC<SkillInfoButtonProps> = ({
	text,
	onClick,
	variant = 'primary',
	isExchangeProposed = false,
}) => {
	const buttonText = isExchangeProposed ? 'Обмен предложен' : text;
	const buttonVariant = isExchangeProposed ? 'secondary' : variant;
	const buttonDisabled = isExchangeProposed;

	const buttonClassName = `${styles.button} ${
		isExchangeProposed ? styles['exchange-proposed'] : ''
	}`.trim();

	return (
		<Button
			variant={buttonVariant}
			onClick={onClick}
			className={buttonClassName}
			disabled={buttonDisabled}
		>
			{isExchangeProposed && (
				<img src={clockIcon} alt="" width={16} height={16} />
			)}
			{buttonText}
		</Button>
	);
};
