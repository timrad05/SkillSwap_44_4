import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeaderProfile } from './HeaderProfile';

const meta = {
	title: 'Shared/UI/HeaderProfile',
	component: HeaderProfile,
	tags: ['autodocs'],
	argTypes: {
		avatar: { control: 'text' },
	},
} satisfies Meta<typeof HeaderProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithAvatar: Story = {
	args: {
		name: 'Мария',
		avatar:
			'https://img.freepik.com/free-photo/medium-shot-woman-posing-with-flower_23-2150170560.jpg?t=st=1769184443~exp=1769188043~hmac=b54ef542eadaa510f6bcdd5d0ed3b946618ab830a946076dcd8f3e92e022f238&w=1480',
	},
};

export const WithoutAvatar: Story = {
	args: {
		name: 'Мария',
	},
};
