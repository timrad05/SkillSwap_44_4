import type { InfoProps } from './Info.types';
import styles from './Info.module.scss';

export const Info = ({ image, title, text, className = '' }: InfoProps) => {
	return (
		<div className={`${styles.root} ${className}`}>
			<img src={image} alt={title} className={styles.image} />
			<div>
				<h2 className={styles.title}>{title}</h2>
				<p className={styles.text}>{text}</p>
			</div>
		</div>
	);
};
