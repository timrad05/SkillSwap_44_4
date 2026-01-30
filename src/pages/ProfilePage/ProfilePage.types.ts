import type { ProfileInfoProps } from '../../shared/ui/ProfileInfo';
import type { TSidebarMenuProps } from '../../shared/ui/SidebarMenu';
import type { FooterProps } from '../../widgets/Footer';
import type { HeaderProps } from '../../widgets/Header';

export interface ProfilePageProps {
	headerProps?: HeaderProps;
	sidebarProps?: TSidebarMenuProps;
	footerProps?: FooterProps;
	profileinfoProps?: ProfileInfoProps;
}
