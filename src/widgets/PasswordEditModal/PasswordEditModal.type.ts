export interface PasswordEditModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSave: (newPassword: string) => void;
}
