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

			<div className={styles.container}>
				{/* Левая панель - форма входа */}
				<div className={styles.loginPanel}>
					<div className={styles.content}>
						<h1 className={styles.title}>Вход</h1>
						<p className={styles.subtitle}>С возвращением в SkillSwap!</p>
						<LoginForm />
					</div>
				</div>

				{/* Правая панель - Info компонент */}
				<div className={styles.infoPanel}>
					<Info
						image="src/shared/assets/images/light-bulb.png"
						title="С возвращением в SkillSwap!"
						text="Обменивайтесь знаниями и навыками с другими людьми"
					/>
				</div>
			</div>
		</div>
	);
};
