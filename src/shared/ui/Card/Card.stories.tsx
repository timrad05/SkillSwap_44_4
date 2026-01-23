import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
	title: 'shared/ui/Card',
	component: Card,
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
	args: {
		avatar: 'https://clck.ru/3RPQFg',
		name: 'Иван',
		city: 'Санкт-Петербург',
		age: 34,
		canTeach: [{ text: 'Английский язык', color: 'languages' }],
		wantToLearn: [
			{ text: 'Тайм менеджмент', color: 'education' },
			{ text: 'Медитация', color: 'health' },
			{ text: '+2', color: 'plus' },
		],
	},
};
