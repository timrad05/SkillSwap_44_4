import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillInfo } from './SkillInfo';

const meta: Meta<typeof SkillInfo> = {
	title: 'Shared/UI/SkillInfo',
	component: SkillInfo,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof SkillInfo>;

const defaultDescription = `Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры`;

export const Default: Story = {
	args: {
		title: 'Игра на барабанах',
		subtitle: 'Творчество и искусство / Музыка и звук',
		description: defaultDescription,
		buttonProps: {
			text: 'Предложить обмен',
			onClick: () => console.log('Кнопка "Предложить обмен" нажата'),
			variant: 'primary',
		},
	},
};
