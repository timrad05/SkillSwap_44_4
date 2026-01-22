import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropDown } from './DropDown';

const meta = {
	title: 'UI/DropDown',
	component: DropDown,
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
	{ value: '1', label: 'Вариант 1' },
	{ value: '2', label: 'Вариант 2' },
	{ value: '3', label: 'Вариант 3' },
];

export const Basic: Story = {
	args: {
		options,
		placeholder: 'Дропдаун',
	},
};

export const WithValue: Story = {
	args: {
		options,
		value: '2',
		placeholder: 'Дропдаун',
	},
};
