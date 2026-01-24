import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
	title: 'Widgets/UI/Header',
	component: Header,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const NotAuthorized: Story = {
	args: {
		isAuthorized: false,
		isAuthPage: false,
	},
};

export const Authorized: Story = {
	args: {
		isAuthorized: true,
		isAuthPage: false,
	},
};

export const AuthPage: Story = {
	args: {
		isAuthorized: false,
		isAuthPage: true,
	},
};
