import type { Meta, StoryObj } from '@storybook/react-vite';
import clsx from 'clsx';
import { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FooterMenu } from './FooterMenu';

const meta: Meta<typeof FooterMenu> = {
	title: 'shared/ui/FooterMenu',
	component: FooterMenu,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof FooterMenu>;

const items = [
	{ id: 'about', label: 'О проекте' },
	{ id: 'skills', label: 'Все навыки' },
	{ id: 'contacts', label: 'Контакты' },
	{ id: 'blog', label: 'Блог' },
	{ id: 'privacy', label: 'Политика конфиденциальности' },
	{ id: 'agreement', label: 'Пользовательское соглашение' },
];

const itemsWithTo = items.map((item) => ({
	...item,
	to: `/${item.id}`,
}));

const InteractiveButtons = () => {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	return (
		<FooterMenu
			items={items.map((item) => ({
				...item,
				className: clsx({ 'active-class': selectedId === item.id }),
			}))}
			onSelect={setSelectedId}
		/>
	);
};

const InteractiveLinks = () => (
	<MemoryRouter initialEntries={['/about']}>
		<FooterMenu items={itemsWithTo} />
		<Routes>
			<Route path="/about" element={<div>О проекте</div>} />
			<Route path="/skills" element={<div>Все навыки</div>} />
			<Route path="/contacts" element={<div>Контакты</div>} />
			<Route path="/blog" element={<div>Блог</div>} />
			<Route path="/privacy" element={<div>Политика конфиденциальности</div>} />
			<Route
				path="/agreement"
				element={<div>Пользовательское соглашение</div>}
			/>
		</Routes>
	</MemoryRouter>
);

export const DefaultButtons: Story = {
	render: () => <InteractiveButtons />,
	parameters: {
		docs: {
			description: {
				story: 'Футер-меню в button-mode',
			},
		},
	},
};

export const DefaultLinks: Story = {
	render: () => <InteractiveLinks />,
	parameters: {
		docs: {
			description: {
				story: 'Футер-меню в link-mode с роутингом',
			},
		},
	},
};
