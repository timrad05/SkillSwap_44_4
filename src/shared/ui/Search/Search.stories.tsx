import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useRef, useEffect } from 'react';
import { Search } from './Search';
import type { SearchProps } from './Search.types';

const meta = {
	title: 'Shared/UI/Search',
	component: Search,
	tags: ['autodocs'],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

// Компонент-обертка для интерактивных историй
const Template = (args: SearchProps) => {
	const [value, setValue] = useState(args.value || '');
	return (
		<Search
			{...args}
			value={value}
			onChange={(newValue) => {
				setValue(newValue);
				args.onChange?.(newValue);
			}}
			onClear={() => {
				setValue('');
				args.onClear?.();
			}}
		/>
	);
};

// Компонент с автофокусом
const TemplateWithFocus = (args: SearchProps) => {
	const [value, setValue] = useState(args.value || '');
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	return (
		<Search
			{...args}
			ref={inputRef}
			value={value}
			onChange={(newValue) => {
				setValue(newValue);
				args.onChange?.(newValue);
			}}
			onClear={() => {
				setValue('');
				args.onClear?.();
			}}
		/>
	);
};

export const Default: Story = {
	render: Template,
	args: {
		placeholder: 'Искать навык',
		value: '',
	},
};

export const Focus: Story = {
	render: TemplateWithFocus,
	args: {
		placeholder: '',
		value: '',
	},
};

export const Typing: Story = {
	render: TemplateWithFocus,
	args: {
		placeholder: 'Искать навык',
		value: 'Искать навык',
	},
};

export const Filled: Story = {
	render: Template,
	args: {
		placeholder: 'Искать навык',
		value: 'Искать навык',
	},
};
