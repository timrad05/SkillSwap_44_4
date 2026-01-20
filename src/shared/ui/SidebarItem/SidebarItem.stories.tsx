import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
	},
};

export default meta;
type Story = StoryObj<typeof SidebarItem>;

const InteractiveMenu = () => {
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

export const MenuWithActiveItem: Story = {
	render: () => <InteractiveMenu />,
};

export const Default: Story = {
	args: {
		label: 'Заявки',
		icon: requestIcon,
		active: false,
	},
};

export const Active: Story = {
	args: {
		label: 'Заявки',
		icon: requestIcon,
		active: true,
	},
};
