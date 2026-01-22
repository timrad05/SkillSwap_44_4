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
		layout: 'padded',
	},
};

export default meta;
type Story = StoryObj<typeof FooterMenu>;

const items = [
	{ id: 'about', label: 'О проекте' },
	{ id: 'contacts', label: 'Контакты' },
	{ id: 'privacy', label: 'Политика конфиденциальности' },
	{ id: 'skills', label: 'Все навыки' },
	{ id: 'blog', label: 'Блог' },
	{ id: 'agreement', label: 'Пользовательское соглашение' },
];

const itemsWithTo = items.map((item) => ({
	...item,
	to: `/${item.id}`,
}));

const DesktopWrapper = ({ children }: { children: React.ReactNode }) => (
	<div
		style={{
			width: '1200px',
			margin: '0 auto',
			padding: '40px 20px',
		}}
	>
		{children}
	</div>
);

const InteractiveButtons = () => {
	const [selectedId, setSelectedId] = useState<string | null>(null);
	return (
		<DesktopWrapper>
			<FooterMenu
				items={items.map((item) => ({
					...item,
					className: clsx({ 'active-class': selectedId === item.id }),
				}))}
				onSelect={setSelectedId}
			/>
		</DesktopWrapper>
	);
};

const InteractiveLinks = () => (
	<DesktopWrapper>
		<MemoryRouter initialEntries={['/about']}>
			<FooterMenu items={itemsWithTo} />
			<Routes>
				<Route path="/about" element={<div>О проекте</div>} />
				<Route path="/contacts" element={<div>Контакты</div>} />
				<Route
					path="/privacy"
					element={<div>Политика конфиденциальности</div>}
				/>
				<Route path="/skills" element={<div>Все навыки</div>} />
				<Route path="/blog" element={<div>Блог</div>} />
				<Route
					path="/agreement"
					element={<div>Пользовательское соглашение</div>}
				/>
			</Routes>
		</MemoryRouter>
	</DesktopWrapper>
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
