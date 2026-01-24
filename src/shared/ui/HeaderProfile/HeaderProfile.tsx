import clsx from 'clsx';
import type { FC } from 'react';
import style from './HeaderProfile.module.scss';
import type { HeaderProfileProps } from './HeaderProfile.types';

export const HeaderProfile: FC<HeaderProfileProps> = ({ name, avatar }) => {
	// инициалы - только первая буква имени (или '??' если пусто)
	const initials = name.trim().charAt(0).toUpperCase() || '??';

	return (
		<div className={style.profile}>
			<span className={style.name}>{name}</span>

			{avatar ? (
				<img src={avatar} alt={name} className={style.avatar} />
			) : (
				<div className={clsx(style.avatar, style.placeholder)}>{initials}</div>
			)}
		</div>
	);
};
