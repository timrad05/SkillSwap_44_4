import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalSuccess } from './ModalSuccess';

const meta = {
	title: 'UI/ModalSuccess',
	component: ModalSuccess,
} satisfies Meta<typeof ModalSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		title: 'Операция выполнена',
		text: 'Ваша операция успешно завершена.',
	},
};
