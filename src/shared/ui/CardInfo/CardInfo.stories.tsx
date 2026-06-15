import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardInfo } from './CardInfo';
import { useState } from 'react';
import type { CardInfoProps } from './CardInfo.types';

const meta: Meta<typeof CardInfo> = {
	title: 'shared/CardInfo',
	component: CardInfo,
	tags: [],
	parameters: { layout: 'centered' },
	argTypes: {
		isLiked: {
			control: 'boolean',
			description: 'Состояние лайка (активный/неактивный)',
		},
		onLikeClick: { action: 'liked' },
	},
};

export default meta;

type Story = StoryObj<typeof CardInfo>;

const InteractiveCardInfoComponent = (
	props: Omit<CardInfoProps, 'onLikeClick' | 'isLiked'>,
) => {
	const [isLiked, setIsLiked] = useState(false);

	const handleLikeClick = () => {
		setIsLiked(!isLiked);
	};

	return (
		<CardInfo {...props} isLiked={isLiked} onLikeClick={handleLikeClick} />
	);
};

export const Interactive: Story = {
	render: (args) => <InteractiveCardInfoComponent {...args} />,
	args: {
		avatar: 'https://clck.ru/3RPQFg',
		name: 'Иван',
		city: 'Санкт-Петербург',
		age: 34,
		isLiked: false,
	},
};
