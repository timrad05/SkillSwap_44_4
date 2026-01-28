import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SidebarMenu } from './SidebarMenu';
import likeIcon from '/src/shared/assets/icons/blankLike.svg';
import lampIcon from '/src/shared/assets/icons/idea.svg';
import messageIcon from '/src/shared/assets/icons/message-text.svg';
import requestIcon from '/src/shared/assets/icons/request.svg';
import userIcon from '/src/shared/assets/icons/user.svg';

const meta: Meta<typeof SidebarMenu> = {
	title: 'shared/ui/SidebarMenu',
	component: SidebarMenu,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof SidebarMenu>;

export const SidebarItems = [
	{ id: 'requests', label: 'Заявки', icon: requestIcon },
	{ id: 'exchanges', label: 'Мои обмены', icon: messageIcon },
	{ id: 'favorites', label: 'Избранное', icon: likeIcon },
	{ id: 'skills', label: 'Мои навыки', icon: lampIcon },
	{ id: 'profile', label: 'Личные данные', icon: userIcon },
];

const itemsWithTo = SidebarItems.map((item) => ({
	...item,
	to: `/${item.id}`,
}));

const InteractiveMenuButtons = () => {
	const [activeId, setActiveId] = useState<string | null>('requests');
	return (
		<SidebarMenu
			items={SidebarItems}
			activeId={activeId ?? undefined}
			onSelect={setActiveId}
		/>
	);
};

const InteractiveMenuLinks = () => {
	return (
		<MemoryRouter initialEntries={['/requests']}>
			<SidebarMenu items={itemsWithTo} />
			<Routes>
				<Route path="/requests" element={<div>Requests page</div>} />
				<Route path="/exchanges" element={<div>Exchanges page</div>} />
				<Route path="/favorites" element={<div>Favorites page</div>} />
				<Route path="/skills" element={<div>Skills page</div>} />
				<Route path="/profile" element={<div>Profile page</div>} />
			</Routes>
		</MemoryRouter>
	);
};

export const DefaultButtons: Story = {
	render: () => <InteractiveMenuButtons />,
	parameters: {
		docs: {
			description: {
				story: 'Меню в button-mode с локальной активацией',
			},
		},
	},
};

export const DefaultLinks: Story = {
	render: () => <InteractiveMenuLinks />,
	parameters: {
		docs: {
			description: {
				story: 'Меню в link-mode с роутингом',
			},
		},
	},
};

export const WithActiveItem: Story = {
	args: {
		items: SidebarItems,
		activeId: 'exchanges',
	},
	parameters: {
		docs: {
			description: {
				story: 'Меню с предустановленным активным элементом (button-mode)',
			},
		},
	},
};
