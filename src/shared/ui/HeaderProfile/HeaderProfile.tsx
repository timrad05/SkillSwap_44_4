import clsx from 'clsx';
import type { FC } from 'react';
import style from './HeaderProfile.module.scss';
import type { HeaderProfileProps } from './HeaderProfile.types';

export const HeaderProfile: FC<HeaderProfileProps> = ({
	name,
	avatar,
	onClick,
}) => {
	// инициалы - только первая буква имени (или '??' если пусто)
	const initials = name.trim().charAt(0).toUpperCase() || '??';

	return (
		<div className={style.profile} onClick={onClick} role="button" tabIndex={0}>
			<span className={style.name}>{name}</span>

			{avatar ? (
				<img src={avatar} alt={name} className={style.avatar} />
			) : (
				<div className={clsx(style.avatar, style.placeholder)}>{initials}</div>
			)}
		</div>
	);
};
