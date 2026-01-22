import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

// Метаданные компонента
const meta: Meta<typeof Button> = {
	title: 'Components/Button', // Путь в дереве Storybook
	component: Button,
	parameters: {
		layout: 'centered', // Центрирует кнопку в рабочей области
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Основной вариант (Primary)
export const Primary: Story = {
	args: {
		variant: 'primary',
		children: 'Primary Button',
	},
};

// 2. Второстепенный вариант (Secondary)
export const Secondary: Story = {
	args: {
		variant: 'secondary',
		children: 'Secondary Button',
	},
};

// 3. Основной неактивный вариант (Primary)
export const DisabledPrimary: Story = {
	args: {
		variant: 'primary',
		disabled: true,
		children: 'Неактивная Primary',
	},
};

// 4. Второстепенный неактивный вариант (Secondary)
export const DisabledSecondary: Story = {
	args: {
		variant: 'secondary',
		disabled: true,
		children: 'Неактивная Secondary',
	},
};
