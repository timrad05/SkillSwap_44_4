import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
	title: 'Widgets/ProgressBar',
	component: ProgressBar,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
	argTypes: {
		step: {
			control: {
				type: 'select',
				options: [1, 2, 3],
			},
			description: 'Текущий шаг (от 1 до 3)',
		},
	},
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Step1: Story = {
	args: {
		step: 1,
	},
	name: 'Шаг 1 из 3',
};

export const Step2: Story = {
	args: {
		step: 2,
	},
	name: 'Шаг 2 из 3',
};

export const Step3: Story = {
	args: {
		step: 3,
	},
	name: 'Шаг 3 из 3',
};
