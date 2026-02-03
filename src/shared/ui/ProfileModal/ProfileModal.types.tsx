export type ProfileModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onProfileClick?: () => void;
	onLogout?: () => void;
};
