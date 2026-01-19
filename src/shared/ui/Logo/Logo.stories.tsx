// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
	title: 'shared/Logo',
	component: Logo,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['small', 'medium', 'large'],
		},
	},
};

export default meta;
type Story = StoryObj<typeof Logo>;

const defaultIcon = (
	<svg viewBox="0 0 24 24" fill="none">
		<path
			d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
			fill="white"
		/>
	</svg>
);

export const Default: Story = {
	args: {
		name: 'SkillSwap',
		icon: defaultIcon,
		size: 'medium',
	},
};

export const Small: Story = {
	args: {
		...Default.args,
		size: 'small',
	},
};

export const Large: Story = {
	args: {
		...Default.args,
		size: 'large',
	},
};

export const WithoutIcon: Story = {
	args: {
		name: 'SkillSwap',
		size: 'medium',
	},
};
