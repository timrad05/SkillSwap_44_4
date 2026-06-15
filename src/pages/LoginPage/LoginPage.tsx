import clsx from 'clsx';
import { Header } from '../../widgets/Header';
import { LoginForm } from '../../features/auth/login/ui/LoginForm';
import { Info } from '../../shared/ui/Info';
import styles from './LoginPage.module.scss';
import type { LoginPageProps } from './LoginPage.types';

export const LoginPage = ({ className }: LoginPageProps) => {
	return (
		<div className={clsx(styles.page, className)}>
			<Header isAuthPage={true} />
			<div className={clsx(styles.main, className)}>
				<h1 className={styles.title}>Вход</h1>
				<div className={styles.container}>
					<div className={styles.content}>
						<LoginForm />
					</div>
					<div className={styles.panel}>
						<Info
							image="src/shared/assets/images/light-bulb.png"
							title="С возвращением в SkillSwap!"
							text="Обменивайтесь знаниями и навыками с другими людьми"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
