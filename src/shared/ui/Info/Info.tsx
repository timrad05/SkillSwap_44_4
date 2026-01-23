import type { InfoProps } from './Info.types';
import cls from './Info.module.scss';

export const Info = ({
	image,
	title,
	text,
	className = '',
	children,
}: InfoProps) => {
	return (
		<div className={`${cls.root} ${className}`}>
			<img src={image} alt={title} className={cls.image} />
			<div className={cls.contentBlock}>
				<h2 className={cls.title}>{title}</h2>
				<p className={cls.text}>{text}</p>
				{children && <div className={cls.children}>{children}</div>}
			</div>
		</div>
	);
};
