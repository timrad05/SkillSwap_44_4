import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecommendedCards } from './RecommendedCards';
import type { CardProps } from '../../shared/ui/Card/Card.types';

const meta: Meta<typeof RecommendedCards> = {
	title: 'Widgets/RecommendedCards',
	component: RecommendedCards,
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof RecommendedCards>;

export default meta;
type Story = StoryObj<typeof RecommendedCards>;

const generateCards = (count: number): CardProps[] => {
	const cities = ['Москва', 'СПб', 'Новосибирск', 'Екатеринбург', 'Казань'];

	return Array.from({ length: count }, (_, i) => ({
		avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
		name: `Пользователь ${i + 1}`,
		city: cities[i % cities.length],
		age: 25 + (i % 20),
		canTeach: [{ text: `Навык ${i + 1}` }, { text: `Навык ${i + 2}` }],
		wantToLearn: [{ text: `Изучает ${i + 1}` }],
	}));
};

export const Default: Story = {
	args: {
		cards: generateCards(9),
	},
};

export const MoreThanNine: Story = {
	args: {
		cards: generateCards(12),
	},
};

export const LessThanNine: Story = {
	args: {
		cards: generateCards(5),
	},
};
