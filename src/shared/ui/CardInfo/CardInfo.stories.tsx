import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardInfo } from './CardInfo';

const meta: Meta<typeof CardInfo> = {
	title: 'shared/CardInfo',
	component: CardInfo,
};

export default meta;

type Story = StoryObj<typeof CardInfo>;

export const Default: Story = {
	args: {
		avatar: 'https://clck.ru/3RPQFg',
		name: 'Иван',
		city: 'Санкт-Петербург',
		age: 34,
	},
};
