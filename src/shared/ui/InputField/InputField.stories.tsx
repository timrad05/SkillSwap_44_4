import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
	title: 'shared/InputField',
	component: InputField,
	args: {
		label: 'Email',
		placeholder: 'Введите email',
	},
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {};

export const WithHint: Story = {
	args: {
		label: 'Пароль',
		variant: 'password',
		placeholder: 'Введите пароль',
		hint: 'Надёжный',
	},
};

export const PasswordField: Story = {
	args: {
		label: 'Пароль',
		variant: 'password',
		value: 'Чер5нослив)',
		hint: 'Надёжный',
	},
};

export const WithError: Story = {
	args: {
		label: 'Email',
		value: 'petrov@mail.ru',
		error: true,
		errorText: 'Email уже используется',
	},
};

export const ChangeField: Story = {
	args: {
		label: 'Имя',
		variant: 'change',
		value: 'Мария',
	},
};

export const RequiredField: Story = {
	args: {
		label: 'Имя',
		placeholder: 'Введите ваше имя',
		required: true,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Email',
		value: 'petrov@mail.ru',
		disabled: true,
		hint: 'Нельзя изменить',
	},
};
