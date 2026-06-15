import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Like } from './Like';

const meta: Meta<typeof Like> = {
	title: 'shared/ui/Like',
	component: Like,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	argTypes: {
		isActive: {
			control: 'boolean',
			description: 'Состояние лайка (активный/неактивный)',
		},
		onClick: { action: 'clicked' },
	},
};

export default meta;

type Story = StoryObj<typeof Like>;

const InteractiveLikeComponent = () => {
	const [isLiked, setIsLiked] = useState(false);

	const handleClick = () => {
		setIsLiked((prev) => !prev);
	};

	return <Like isActive={isLiked} onClick={handleClick} />;
};

export const Interactive: Story = {
	render: () => <InteractiveLikeComponent />,
};

export const Default: Story = {
	args: {
		isActive: false,
	},
};

export const Active: Story = {
	args: {
		isActive: true,
	},
};
