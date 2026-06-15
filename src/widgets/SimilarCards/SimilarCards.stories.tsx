import type { Meta, StoryObj } from '@storybook/react-vite';
import { SimilarCards } from './SimilarCards';
import type { CardProps } from '../../shared/ui/Card/Card.types';

const meta: Meta<typeof SimilarCards> = {
	title: 'Widgets/SimilarCards',
	component: SimilarCards,
	tags: ['autodocs'],
	argTypes: {
		title: {
			control: 'text',
			description: 'Заголовок секции',
		},
		cards: {
			control: 'object',
			description: 'Массив карточек',
		},
	},
};

export default meta;
type Story = StoryObj<typeof SimilarCards>;

const TestCards: CardProps[] = [
	{
		avatar: 'https://i.pravatar.cc/150?img=1',
		name: 'Иван Петров',
		city: 'Москва',
		age: 28,
		likes: 2,
		canTeach: [{ text: 'Рисование' }, { text: 'Фотография' }],
		wantToLearn: [{ text: 'Английский' }],
		isLiked: false,
	},
	{
		avatar: 'https://i.pravatar.cc/150?img=2',
		name: 'Елена Сидорова',
		city: 'Санкт-Петербург',
		age: 25,
		likes: 3,
		canTeach: [{ text: 'Английский' }, { text: 'Немецкий' }],
		wantToLearn: [{ text: 'Рисование' }, { text: 'Каллиграфия' }],
		isLiked: true,
	},
	{
		avatar: 'https://i.pravatar.cc/150?img=3',
		name: 'Алексей Иванов',
		city: 'Калининград',
		age: 32,
		likes: 4,
		canTeach: [{ text: 'Фотография' }, { text: 'Видеомонтаж' }],
		wantToLearn: [{ text: 'Тайм-менеджмент' }, { text: 'Маркетинг' }],
		isLiked: false,
	},
	{
		avatar: 'https://i.pravatar.cc/150?img=4',
		name: 'Мария Кузнецова',
		city: 'Краснодар',
		age: 24,
		likes: 5,
		canTeach: [{ text: 'Фитнес' }, { text: 'Йога' }],
		wantToLearn: [{ text: 'Кулинария' }, { text: 'Выпечка' }],
		isLiked: true,
	},
];

export const Default: Story = {
	args: {
		title: 'Похожие предложения',
		cards: TestCards.slice(0, 4),
	},
};
