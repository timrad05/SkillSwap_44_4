import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropDown } from './DropDown';
import type { DropDownOption } from './DropDown.types';

const meta: Meta<typeof DropDown> = {
	title: 'UI/DropDown',
	component: DropDown,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions: DropDownOption[] = [
	{ value: '1', label: 'Москва' },
	{ value: '2', label: 'Санкт-Петербург' },
	{ value: '3', label: 'Казань' },
	{ value: '4', label: 'Новосибирск' },
	{ value: '5', label: 'Екатеринбург' },
];

export const Default: Story = {
	args: {
		options: defaultOptions,
		placeholder: 'Не указан',
	},
};

export const WithSelectedValue: Story = {
	args: {
		options: defaultOptions,
		value: '2',
		placeholder: 'Не указан',
	},
};

export const Disabled: Story = {
	args: {
		options: defaultOptions,
		disabled: true,
		placeholder: 'Не указан',
	},
};

export const WithDisabledOptions: Story = {
	args: {
		options: [
			{ value: '1', label: 'Москва' },
			{ value: '2', label: 'Санкт-Петербург' },
			{ value: '3', label: 'Казань (недоступно)', disabled: true },
			{ value: '4', label: 'Новосибирск' },
		],
		placeholder: 'Не указан',
	},
};
