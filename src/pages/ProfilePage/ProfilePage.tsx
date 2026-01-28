import { ProfileInfo } from '../../shared/ui/ProfileInfo';
import { SidebarMenu } from '../../shared/ui/SidebarMenu';
import { Footer } from '../../widgets/Footer';
import { Header } from '../../widgets/Header';
import type { ProfilePageProps } from './ProfilePage.types';
import styles from './ProfilePage.module.scss';

export const ProfilePage = ({
	headerProps = {},
	sidebarProps = {
		items: [],
		activeId: '',
		onSelect: undefined,
	},
	footerProps = {},
	profileinfoProps = {},
}: ProfilePageProps) => {
	return (
		<div className={styles.page}>
			<Header {...headerProps} />

			<main className={styles.main}>
				<aside className={styles.sidebar}>
					<SidebarMenu {...sidebarProps} />
				</aside>
				<div className={styles.profile}>
					<ProfileInfo {...profileinfoProps} />
				</div>
			</main>
			<Footer {...footerProps} />
		</div>
	);
};
