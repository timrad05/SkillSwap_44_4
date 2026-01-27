import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProfileForm } from './ProfileForm';

const meta: Meta<typeof ProfileForm> = {
	title: 'shared/ui/ProfileForm',
	component: ProfileForm,
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof ProfileForm>;

export const Default: Story = {};
