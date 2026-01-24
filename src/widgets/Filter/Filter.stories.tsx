import type { Meta, StoryObj } from '@storybook/react-vite';
import { Filter } from './Filter';

const meta: Meta<typeof Filter> = {
	title: 'widgets/Filter',
	component: Filter,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		onRadioGroupChange: {
			action: 'radio group changed',
			description: 'Обработчик изменения радио-кнопки',
		},
		onCheckBoxToggle: {
			action: 'checkbox toggled',
			description: 'Обработчик переключения чекбокса',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Filter>;

export const Default: Story = {
	args: {},
};

export const WithAllCategoriesExpanded: Story = {
	args: {},
};
