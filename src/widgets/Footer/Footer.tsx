import clsx from 'clsx';
import type { FC } from 'react';
import style from './Footer.module.scss';
import { Logo } from '../../shared/ui/Logo/Logo';
import { FooterMenu } from '../../shared/ui/FooterMenu/FooterMenu';
import type { FooterProps } from '../Footer/Footer.types';

export const Footer: FC<FooterProps> = ({
	className,
	logoConfig = {
		name: 'SkillSwap',
		size: 'medium',
	},
	menuItems = [],
	onMenuItemSelect,
	copyrightYear = new Date().getFullYear(),
}) => {
	const logoIcon = (
		<svg viewBox="0 0 24 24" fill="none">
			<path
				d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
				fill="white"
			/>
		</svg>
	);

	return (
		<footer className={clsx(style.footer, className)}>
			<div className={clsx(style.container)}>
				<div className={clsx(style['left-section'])}>
					<Logo name={logoConfig.name} icon={logoIcon} size={logoConfig.size} />
					<div className={clsx(style.copyright)}>
						SkillSwap - {copyrightYear}
					</div>
				</div>
				{menuItems.length > 0 && (
					<div className={clsx(style['right-section'])}>
						<FooterMenu items={menuItems} onSelect={onMenuItemSelect} />
					</div>
				)}
			</div>
		</footer>
	);
};
