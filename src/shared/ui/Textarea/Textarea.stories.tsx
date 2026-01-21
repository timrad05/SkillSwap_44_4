import type { Meta, StoryObj } from '@storybook/react-vite';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
	title: 'shared/ui/Textarea',
	component: Textarea,
};

export default meta;

type Story = StoryObj<typeof Textarea>;

// Вариант для регистрации (без иконки)
export const RegistrationStyle: Story = {
	args: {
		placeholder: 'Коротко опишите, чему можете научить',
		rows: 3,
		showIcon: false,
	},
};

// Вариант для редактирования профиля (с иконкой)
export const ProfileStyle: Story = {
	args: {
		placeholder: 'Расскажите о себе',
		rows: 5,
		showIcon: true,
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
