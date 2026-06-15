import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
	title: 'shared/Input',
	component: Input,
	args: {
		placeholder: 'Введите текст',
	},
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const Password: Story = {
	args: {
		variant: 'password',
		placeholder: 'Введите ваш пароль',
	},
};

export const Change: Story = {
	args: {
		variant: 'change',
		value: 'Мария',
	},
};

export const Focus: Story = {
	args: {
		autoFocus: true,
	},
};

export const Error: Story = {
	args: {
		error: true,
		errorText: 'Неверный ввод',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};
