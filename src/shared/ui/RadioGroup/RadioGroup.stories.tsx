import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import type { TRadioGroupProps } from './RadioGroup.types';

const meta: Meta<typeof RadioGroup> = {
	title: 'shared/ui/RadioGroup',
	component: RadioGroup,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		options: {
			description: 'Массив опций для выбора',
		},
		onChange: {
			action: 'changed',
			description: 'Обработчик изменения выбранной опции',
		},
		name: {
			description: 'Имя группы радио-кнопок',
		},
		value: {
			description: 'Выбранное значение',
			control: 'select',
			options: ['all', 'learn', 'teach'],
		},
	},
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

const defaultOptions = [
	{ value: 'all', label: 'Всё' },
	{ value: 'learn', label: 'Хочу научиться' },
	{ value: 'teach', label: 'Могу научить' },
];

const InteractiveRadioGroup = (args: TRadioGroupProps) => {
	const [selectedValue, setSelectedValue] = useState(args.value || 'all');

	const handleChange = (value: string) => {
		setSelectedValue(value);
		args.onChange?.(value);
	};

	return <RadioGroup {...args} value={selectedValue} onChange={handleChange} />;
};

export const RadioGroupComponent: Story = {
	render: (args: TRadioGroupProps) => <InteractiveRadioGroup {...args} />,
	args: {
		options: defaultOptions,
		name: 'skill-filter',
		value: 'all',
	},
};
