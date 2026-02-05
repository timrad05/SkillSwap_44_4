import type { Meta, StoryObj } from '@storybook/react-vite';
import { PasswordEditModal } from './PasswordEditModal';

const meta = {
	title: 'Widgets/UI/PasswordEditModal',
	component: PasswordEditModal,
} satisfies Meta<typeof PasswordEditModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		isOpen: true,
		onClose: () => {},
		onSave: (value: string) => {
			console.log('Новый пароль: ', value);
		},
	},
};
