import type { TModalSuccessProps } from './ModalSuccess.types';
import styles from './ModalSuccess.module.scss';
import clsx from 'clsx';
import { Button } from '../Button';

export const ModalSuccess = ({
	icon,
	title,
	text,
	className = '',
	onClose,
}: TModalSuccessProps) => {
	const handleButtonClick = () => {
		onClose?.();
	};

	return (
		<div className={clsx(styles.modal, className)}>
			{icon && <div className={styles.icon}>{icon}</div>}

			<h2 className={styles.title}>{title}</h2>

			<p className={styles.text}>{text}</p>

			<div className={styles['button-wrapper']}>
				<Button onClick={handleButtonClick}>Готово</Button>
			</div>
		</div>
	);
};
