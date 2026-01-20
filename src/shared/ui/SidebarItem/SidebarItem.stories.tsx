import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SidebarItem } from './SidebarItem';
import likeIcon from '/src/shared/assets/icons/blankLike.svg';
import lampIcon from '/src/shared/assets/icons/idea.svg';
import messageIcon from '/src/shared/assets/icons/message-text.svg';
import requestIcon from '/src/shared/assets/icons/request.svg';
import userIcon from '/src/shared/assets/icons/user.svg';

const meta: Meta<typeof SidebarItem> = {
	title: 'shared/ui/SidebarItem',
	component: SidebarItem,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		active: { control: 'boolean' },
		to: { control: 'text' },
	},
};

export default meta;
type Story = StoryObj<typeof SidebarItem>;

const InteractiveMenuButton = () => {
	const [activeId, setActiveId] = useState<string | null>('requests');
	const items = [
		{ id: 'requests', label: 'Заявки', icon: requestIcon },
		{ id: 'exchanges', label: 'Мои обмены', icon: messageIcon },
		{ id: 'favorites', label: 'Избранное', icon: likeIcon },
		{ id: 'skills', label: 'Мои навыки', icon: lampIcon },
		{ id: 'profile', label: 'Личные данные', icon: userIcon },
	];
	return (
		<div
			style={{
				width: 280,
				padding: '20px 16px',
				backgroundColor: '#f9faf7',
				borderRadius: '12px',
				display: 'flex',
				flexDirection: 'column',
				gap: '8px',
			}}
		>
			{items.map((item) => (
				<SidebarItem
					key={item.id}
					label={item.label}
					icon={item.icon}
					active={activeId === item.id}
					onClick={() => setActiveId(item.id)}
				/>
			))}
		</div>
	);
};

const InteractiveMenuLink = () => {
	const items = [
		{ id: 'requests', label: 'Заявки', icon: requestIcon, to: '/requests' },
		{
			id: 'exchanges',
			label: 'Мои обмены',
			icon: messageIcon,
			to: '/exchanges',
		},
		{ id: 'favorites', label: 'Избранное', icon: likeIcon, to: '/favorites' },
		{ id: 'skills', label: 'Мои навыки', icon: lampIcon, to: '/skills' },
		{ id: 'profile', label: 'Личные данные', icon: userIcon, to: '/profile' },
	];
	return (
		<MemoryRouter initialEntries={['/requests']}>
			<div
				style={{
					width: 280,
					padding: '20px 16px',
					backgroundColor: '#f9faf7',
					borderRadius: '12px',
					display: 'flex',
					flexDirection: 'column',
					gap: '8px',
				}}
			>
				{items.map((item) => (
					<SidebarItem
						key={item.id}
						label={item.label}
						icon={item.icon}
						to={item.to}
					/>
				))}
			</div>
			<Routes>
				<Route path="/requests" element={<div>Страница заявок</div>} />
				<Route path="/exchanges" element={<div>Страница обменов</div>} />
				<Route path="/favorites" element={<div>Страница избранного</div>} />
				<Route path="/skills" element={<div>Страница навыков</div>} />
				<Route path="/profile" element={<div>Страница профиля</div>} />
			</Routes>
		</MemoryRouter>
	);
};

export const MenuWithButtons: Story = {
	render: () => <InteractiveMenuButton />,
};

export const MenuWithLinks: Story = {
	render: () => <InteractiveMenuLink />,
};

export const DefaultButton: Story = {
	args: {
		label: 'Заявки',
		icon: requestIcon,
		active: false,
	},
};

export const ActiveButton: Story = {
	args: {
		label: 'Заявки',
		icon: requestIcon,
		active: true,
	},
};

export const AsLink: Story = {
	render: (args) => (
		<MemoryRouter initialEntries={['/requests']}>
			<SidebarItem {...args} />
		</MemoryRouter>
	),
	args: {
		label: 'Заявки',
		icon: requestIcon,
		to: '/requests',
	},
};
