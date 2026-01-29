import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillCard } from './SkillCard';
import type { SkillCardProps } from './SkillCard.types';

const meta: Meta<typeof SkillCard> = {
	title: 'shared/ui/SkillCard',
	component: SkillCard,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
} satisfies Meta<typeof SkillCard>;

export default meta;
type Story = StoryObj<typeof SkillCard>;

const defaultArgs: SkillCardProps = {
	cardInfo: {
		avatar: 'https://clck.ru/3RPQFg',
		name: 'Иван',
		city: 'Санкт-Петербург',
		age: 34,
	},
	description:
		'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
	canTeach: [{ text: 'Английский язык', color: 'languages' }],
	wantsToLearn: [
		{ text: 'Тайм менеджмент', color: 'education' },
		{ text: 'Медитация', color: 'health' },
	],
};

export const Default: Story = {
	args: defaultArgs,
};

// Пример с несколькими навыками
export const WithMultipleSkills: Story = {
	args: {
		cardInfo: {
			avatar: 'https://clck.ru/3RPQFg',
			name: 'Мария',
			city: 'Москва',
			age: 28,
		},
		description:
			'Дизайнер и художник, ищу единомышленников для творческих проектов',
		canTeach: [
			{ text: 'Графический дизайн', color: 'creativity' },
			{ text: 'Английский язык', color: 'languages' },
			{ text: 'Рисование акварелью', color: 'creativity' },
		],
		wantsToLearn: [
			{ text: 'Фотография', color: 'creativity' },
			{ text: 'Маркетинг', color: 'business' },
			{ text: '+2', color: 'plus' },
		],
	},
};
