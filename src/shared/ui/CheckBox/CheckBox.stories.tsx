import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckBox } from './CheckBox';
import type { TCheckBoxProps } from './CheckBox.types';

const meta: Meta<typeof CheckBox> = {
	title: 'shared/ui/CheckBox',
	component: CheckBox,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		checked: {
			control: 'boolean',
			description: 'Состояние чекбокса',
		},
		isDisabled: {
			control: 'boolean',
			description: 'Заблокирован ли чекбокс',
		},
		hasSubcategories: {
			control: 'boolean',
			description: 'Есть ли подкатегории',
		},
		isParent: {
			control: 'boolean',
			description: 'Является ли родительской категорией',
		},
		onToggle: {
			action: 'toggled',
			description: 'Обработчик переключения чекбокса',
		},
	},
};

export default meta;

type Story = StoryObj<typeof CheckBox>;

const InteractiveCheckBox = (args: TCheckBoxProps) => {
	const [isChecked, setIsChecked] = useState(args.checked || false);

	const handleToggle = (value: string) => {
		setIsChecked(!isChecked);
		args.onToggle?.(value);
	};

	return <CheckBox {...args} checked={isChecked} onToggle={handleToggle} />;
};

export const ParentCategorySelected: Story = {
	render: (args: TCheckBoxProps) => <InteractiveCheckBox {...args} />,
	args: {
		option: { value: 'creativity', label: 'Творчество и искусство' },
		checked: true,
		isParent: true,
		hasSubcategories: true,
	},
};

export const SubcategorySelected: Story = {
	render: (args: TCheckBoxProps) => <InteractiveCheckBox {...args} />,
	args: {
		option: { value: 'drawing', label: 'Рисование и иллюстрация' },
		checked: true,
		isParent: false,
		hasSubcategories: false,
	},
};

export const SubcategoryUnselected: Story = {
	render: (args: TCheckBoxProps) => <InteractiveCheckBox {...args} />,
	args: {
		option: { value: 'photography', label: 'Фотография' },
		checked: false,
		isParent: false,
		hasSubcategories: false,
	},
};

// Пример: Родительская категория не выбрана
export const ParentCategoryUnselected: Story = {
	render: (args: TCheckBoxProps) => <InteractiveCheckBox {...args} />,
	args: {
		option: { value: 'languages', label: 'Языки' },
		checked: false,
		isParent: true,
		hasSubcategories: true,
	},
};

// Комплексный пример с родительской категорией и подкатегориями
const CategoriesExample = () => {
	type CategoryState = {
		checked: boolean;
	};

	const [categories, setCategories] = useState<Record<string, CategoryState>>({
		creativity: { checked: true },
		drawing: { checked: true },
		photography: { checked: false },
		video: { checked: false },
		music: { checked: false },
		acting: { checked: false },
		writing: { checked: false },
		artTherapy: { checked: false },
		decor: { checked: false },
	});

	const handleToggle = (value: string) => {
		setCategories((prev) => ({
			...prev,
			[value]: {
				checked: !prev[value]?.checked,
			},
		}));
	};

	const subcategories = [
		{ value: 'drawing', label: 'Рисование и иллюстрация' },
		{ value: 'photography', label: 'Фотография' },
		{ value: 'video', label: 'Видеомонтаж' },
		{ value: 'music', label: 'Музыка и звук' },
		{ value: 'acting', label: 'Актерское мастерство' },
		{ value: 'writing', label: 'Креативное письмо' },
		{ value: 'artTherapy', label: 'Арт-терапия' },
		{ value: 'decor', label: 'Декор и DIY' },
	];

	return (
		<div style={{ width: '300px' }}>
			{/* Родительская категория */}
			<CheckBox
				option={{ value: 'creativity', label: 'Творчество и искусство' }}
				checked={categories.creativity.checked}
				isParent={true}
				hasSubcategories={true}
				onToggle={handleToggle}
			/>

			{/* Подкатегории */}
			<div style={{ marginLeft: '32px', marginTop: '8px' }}>
				{subcategories.map((sub) => (
					<CheckBox
						key={sub.value}
						option={sub}
						checked={categories[sub.value]?.checked}
						onToggle={handleToggle}
					/>
				))}
			</div>
		</div>
	);
};

export const ComplexExampleStory: Story = {
	render: () => <CategoriesExample />,
};
