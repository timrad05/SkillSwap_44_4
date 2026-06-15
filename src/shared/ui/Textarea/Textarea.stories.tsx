import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ChangeEvent } from 'react';
import { Textarea } from './Textarea';
import type { TextareaProps } from './Textarea.types';

const meta: Meta<typeof Textarea> = {
	title: 'shared/ui/Textarea',
	component: Textarea,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		value: {
			control: 'text',
			description: 'Текст внутри поля',
		},
		placeholder: {
			control: 'text',
			description: 'Подсказка внутри поля',
		},
		rows: {
			control: 'number',
			description: 'Количество видимых строк',
		},
		showIcon: {
			control: 'boolean',
			description:
				'Отображать ли иконку (например, для редактирования профиля)',
		},
		error: {
			control: 'boolean',
			description: 'Состояние ошибки валидации',
		},
		errorText: {
			control: 'text',
			description: 'Текст ошибки под полем',
		},
		disabled: {
			control: 'boolean',
			description: 'Заблокировано ли поле для ввода',
		},
		autoFocus: {
			control: 'boolean',
			description: 'Автоматический фокус при загрузке',
		},
		onChange: {
			action: 'changed',
			description: 'Обработчик изменения текста',
		},
	},
};

export default meta;

type Story = StoryObj<typeof Textarea>;

const InteractiveTextarea = (args: TextareaProps) => {
	const [value, setValue] = useState(args.value || '');

	const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setValue(e.target.value);
		args.onChange?.(e);
	};

	return <Textarea {...args} value={value} onChange={handleChange} />;
};

export const RegistrationStyle: Story = {
	render: (args: TextareaProps) => <InteractiveTextarea {...args} />,
	args: {
		placeholder: 'Коротко опишите, чему можете научить',
		rows: 3,
		showIcon: false,
	},
};

export const ProfileStyle: Story = {
	render: (args: TextareaProps) => <InteractiveTextarea {...args} />,
	args: {
		placeholder: 'Расскажите о себе',
		rows: 5,
		showIcon: true,
		value: 'Я опытный преподаватель с 10-летним стажем...',
	},
};

export const Error: Story = {
	render: (args: TextareaProps) => <InteractiveTextarea {...args} />,
	args: {
		placeholder: 'Введите описание',
		error: true,
		errorText: 'Описание должно содержать минимум 10 символов',
		value: 'Коротко',
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
		value: 'Этот текст нельзя редактировать',
		placeholder: 'Недоступно для ввода',
	},
};

export const Focus: Story = {
	render: (args: TextareaProps) => <InteractiveTextarea {...args} />,
	args: {
		placeholder: 'Поле получает фокус автоматически',
		autoFocus: true,
		rows: 4,
	},
};

export const ManyRows: Story = {
	render: (args: TextareaProps) => <InteractiveTextarea {...args} />,
	args: {
		placeholder: 'Введите подробный текст...',
		rows: 10,
		showIcon: true,
	},
};
