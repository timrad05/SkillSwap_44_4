import type { Meta, StoryObj } from '@storybook/react-vite';
import { FilteredCards } from './FilteredCards';

const meta: Meta<typeof FilteredCards> = {
	title: 'widgets/FilteredCards',
	component: FilteredCards,
	parameters: {
		layout: 'padded',
	},
};

export default meta;

type Story = StoryObj<typeof FilteredCards>;

export const Default: Story = {
	args: {
		cards: [
			{
				avatar: 'https://clck.ru/3RPQFg',
				name: 'Иван',
				city: 'Санкт-Петербург',
				age: 34,
				likes: 21,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
					{ text: '+2', color: 'plus' },
				],
			},
			{
				avatar: 'https://clck.ru/3RSXRN',
				name: 'Виктория',
				city: 'Кемерово',
				age: 30,
				likes: 22,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
				],
			},
			{
				avatar: 'https://clck.ru/3RSXUF',
				name: 'Виктория',
				city: 'Сочи',
				age: 31,
				likes: 23,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
				],
			},
			{
				avatar: 'https://clck.ru/3RSXVn',
				name: 'Елена',
				city: 'Красноярск',
				age: 28,
				likes: 25,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
				],
			},
			{
				avatar: 'https://clck.ru/3RSXYs',
				name: 'Константин',
				city: 'Иркутск',
				age: 36,
				likes: 27,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
				],
			},
			{
				avatar: 'https://clck.ru/3RSXbe',
				name: 'София',
				city: 'Абакан',
				age: 24,
				likes: 28,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
				],
			},
			{
				avatar: 'https://clck.ru/3RSXdt',
				name: 'Екатерина',
				city: 'Пермь',
				age: 33,
				likes: 21,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
				],
			},
			{
				avatar: 'https://clck.ru/3RSXey',
				name: 'Дарья',
				city: 'Ярославль',
				age: 26,
				likes: 31,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
				],
			},
			{
				avatar: 'https://clck.ru/3RSXhS',
				name: 'Алла',
				city: 'Архангельск',
				age: 22,
				likes: 32,
				canTeach: [{ text: 'Игра на барабанах', color: 'creativity' }],
				wantToLearn: [
					{ text: 'Тайм менеджмент', color: 'education' },
					{ text: 'Медитация', color: 'health' },
				],
			},
		],
	},
};
