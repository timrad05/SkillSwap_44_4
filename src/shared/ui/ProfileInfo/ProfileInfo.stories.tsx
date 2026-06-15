import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileInfo } from './ProfileInfo';

const meta: Meta<typeof ProfileInfo> = {
	title: 'shared/ui/ProfileInfo',
	component: ProfileInfo,
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof ProfileInfo>;

export const Default: Story = {
	args: {
		avatarUrl: '/avatar.jpg',
	},
};
