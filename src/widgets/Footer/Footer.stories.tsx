import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
	title: 'Widgets/Footer',
	component: Footer,
	parameters: {
		layout: 'fullscreen',
	},
	tags: ['autodocs'],
};

export default meta;

export const Default: StoryObj<typeof Footer> = {
	args: {
		logoConfig: {
			name: 'SkillSwap',
			size: 'medium',
		},
		menuItems: [
			{ id: 'about', label: 'О проекте' },
			{ id: 'contact', label: 'Контакты' },
			{ id: 'privacy', label: 'Политика конфиденциальности' },
			{ id: 'skills', label: 'Все навыки' },
			{ id: 'blog', label: 'Блог' },
			{ id: 'terms', label: 'Пользовательское соглашение' },
		],
	},
};
