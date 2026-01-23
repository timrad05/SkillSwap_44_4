import clsx from 'clsx';
import type { FC } from 'react';
import style from './HeaderProfile.module.css';
import type { HeaderProfileProps } from './HeaderProfile.types';

export const HeaderProfile: FC<HeaderProfileProps> = ({ name, avatar }) => {
	// инициалы - только первая буква имени (или '??' если пусто)
	const initials = name.trim().charAt(0).toUpperCase() || '??';

	return (
		<div className={style.profile}>
			{avatar ? (
				<img
					src={avatar}
					alt={name}
					className={style.avatar}
					width={40}
					height={40}
				/>
			) : (
				<div className={clsx(style.avatar, style.placeholder)}>{initials}</div>
			)}

			<span className={style.name}>{name}</span>
		</div>
	);
};
