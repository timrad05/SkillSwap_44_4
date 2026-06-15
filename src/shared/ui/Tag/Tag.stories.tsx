import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
	title: 'shared/ui/Tag',
	component: Tag,
	tags: ['autodocs'],
	argTypes: {
		color: {
			control: { type: 'select' },
			options: [
				'business',
				'creativity',
				'languages',
				'education',
				'home',
				'health',
				'plus',
			],
			text: { control: 'text' },
		},
	},
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof Tag>;

export const English: Story = {
	args: {
		text: 'Английский язык',
		color: 'languages',
	},
};

export const TimeManagement: Story = {
	args: {
		text: 'Тайм менеджмент',
		color: 'education',
	},
};

export const Meditation: Story = {
	args: {
		text: 'Медитация',
		color: 'health',
	},
};

export const BusinessPlan: Story = {
	args: {
		text: 'Бизнес-план',
		color: 'business',
	},
};

export const Creativity: Story = {
	args: {
		text: 'Игра на барабанах',
		color: 'creativity',
	},
};

export const Restavration: Story = {
	args: {
		text: 'Реставрация мебели',
		color: 'home',
	},
};

export const Plus: Story = {
	args: {
		text: '+2',
		color: 'plus',
	},
};
