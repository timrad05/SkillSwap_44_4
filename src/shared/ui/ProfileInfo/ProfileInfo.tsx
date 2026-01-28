import { ProfileForm } from '../ProfileForm';
import type { ProfileInfoProps } from './ProfileInfo.types';

import styles from './ProfileInfo.module.scss';

export const ProfileInfo = ({
	avatarUrl = 'https://placehold.co/160x160',
}: ProfileInfoProps) => {
	return (
		<div className={styles.wrapper}>
			<ProfileForm />

			<div className={styles['avatar-wrapper']}>
				<img
					src={avatarUrl}
					alt="Аватар пользователя"
					className={styles.avatar}
				/>

				<button
					type="button"
					className={styles['edit-button']}
					aria-label="Изменить фото профиля"
				>
					✎
				</button>
			</div>
		</div>
	);
};
