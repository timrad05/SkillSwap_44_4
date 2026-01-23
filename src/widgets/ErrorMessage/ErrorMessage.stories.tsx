import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorMessage } from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
	title: 'Widgets/UI/ErrorMessage',
	component: ErrorMessage,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Error404: Story = {
	args: {
		type: '404',
	},
};

export const Error500: Story = {
	args: {
		type: '500',
	},
};
