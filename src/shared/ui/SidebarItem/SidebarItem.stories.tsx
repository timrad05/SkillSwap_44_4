import type { Meta, StoryObj } from '@storybook/react-vite';
import { SidebarItem } from './SidebarItem';

const meta: Meta<typeof SidebarItem> = {
	title: 'shared/ui/SidebarItem',
	component: SidebarItem,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof SidebarItem>;

export const WithRequestIcon: Story = {
	args: {
		label: 'Заявки',
		icon: '/src/shared/assets/icons/request.svg',
		active: false,
	},
};
