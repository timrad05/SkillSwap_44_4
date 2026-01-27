import clsx from 'clsx';
import type { FC } from 'react';
import { ErrorMessage } from '../../widgets/ErrorMessage';
import { Footer } from '../../widgets/Footer';
import { Header } from '../../widgets/Header';
import style from './ServerErrorPage.module.scss';
import type { ServerErrorPageProps } from './ServerErrorPage.types';

export const ServerErrorPage: FC<ServerErrorPageProps> = ({ className }) => {
	return (
		<div className={clsx(style.page, className)}>
			<Header />
			<ErrorMessage type="500" />
			<Footer />
		</div>
	);
};
