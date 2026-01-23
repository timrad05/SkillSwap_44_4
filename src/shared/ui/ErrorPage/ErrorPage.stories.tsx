import type { Meta, StoryObj } from '@storybook/react-vite';
import { ErrorPage } from './ErrorPage';

const meta: Meta<typeof ErrorPage> = {
	title: 'Shared/UI/ErrorPage',
	component: ErrorPage,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

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
