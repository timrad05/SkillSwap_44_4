import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { useState } from 'react';

const meta: Meta<typeof Card> = {
	title: 'shared/ui/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		onLikeClick: { action: 'liked' },
		onMoreClick: { action: 'more clicked' },
	},
};

export default meta;
type Story = StoryObj<typeof Card>;

// Интерактивная карточка с работающим лайком
export const Interactive: Story = {
	render: function Render(args) {
		const [isLiked, setIsLiked] = useState(args.isLiked || false);

		const handleLikeClick = () => {
			setIsLiked(!isLiked);
			console.log(`Лайк: ${isLiked ? 'убрали' : 'поставили'}`);
			args.onLikeClick?.();
		};

		const handleMoreClick = () => {
			console.log('Кнопка "Подробнее" нажата');
			args.onMoreClick?.();
		};

		return (
			<Card
				{...args}
				isLiked={isLiked}
				onLikeClick={handleLikeClick}
				onMoreClick={handleMoreClick}
			/>
		);
	},
	args: {
		avatar: 'https://clck.ru/3RPQFg',
		name: 'Иван',
		city: 'Санкт-Петербург',
		age: 34,
		likes: 15,
		canTeach: [{ text: 'Английский язык', color: 'languages' }],
		wantToLearn: [
			{ text: 'Тайм менеджмент', color: 'education' },
			{ text: 'Медитация', color: 'health' },
			{ text: '+2', color: 'plus' },
		],
		isLiked: false,
		onLikeClick: () => {},
		onMoreClick: () => {},
	},
};
