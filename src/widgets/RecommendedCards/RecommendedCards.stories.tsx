import type { Meta, StoryObj } from '@storybook/react-vite';
import { RecommendedCards } from './RecommendedCards';

const meta: Meta<typeof RecommendedCards> = {
	title: 'Widgets/RecommendedCards',
	component: RecommendedCards,
};

export default meta;
type Story = StoryObj<typeof RecommendedCards>;

const testCards = [
	{
		avatar: 'https://i.pravatar.cc/150?img=1',
		name: 'Алексей',
		city: 'Москва',
		age: 28,
		canTeach: [{ text: 'React' }],
		wantToLearn: [{ text: 'Дизайн' }],
	},
	{
		avatar: 'https://i.pravatar.cc/150?img=2',
		name: 'Мария',
		city: 'СПб',
		age: 25,
		canTeach: [{ text: 'Дизайн' }],
		wantToLearn: [{ text: 'React' }],
	},
	{
		avatar: 'https://i.pravatar.cc/150?img=3',
		name: 'Иван',
		city: 'Казань',
		age: 32,
		canTeach: [{ text: 'TypeScript' }],
		wantToLearn: [{ text: 'UI/UX' }],
	},
];

export const Basic: Story = {
	args: {
		cards: testCards,
	},
};
