import type { TModalSuccessProps } from './ModalSuccess.types';
import styles from './ModalSuccess.module.scss';
import clsx from 'clsx';
import { Button } from '../Button';
import userCircleIcon from '../../assets/icons/user-circle.svg';
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

	const displayIcon = icon || (
		<img
			src={userCircleIcon}
			alt=""
			aria-hidden="true"
			width={100}
			height={100}
		/>
	);

	return (
		<div className={clsx(styles.modal, className)}>
			{icon && <div className={styles.icon}>{displayIcon}</div>}
			<div className={styles.content}>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.text}>{text}</p>
				<div className={styles['button-wrapper']}>
					<Button onClick={handleButtonClick}>Готово</Button>
				</div>
			</div>
		</div>
	);
};
