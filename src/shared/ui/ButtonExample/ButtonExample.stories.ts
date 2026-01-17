import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonExample } from './ButtonExample';

const meta: Meta<typeof ButtonExample> = {
	title: 'shared/ButtonExample',
	component: ButtonExample,
	args: {
		children: 'ButtonExample',
	},
};

export default meta;

type Story = StoryObj<typeof ButtonExample>;

export const Primary: Story = {
	args: {
		variant: 'primary',
	},
};

export const Secondary: Story = {
	args: {
		variant: 'secondary',
	},
};
