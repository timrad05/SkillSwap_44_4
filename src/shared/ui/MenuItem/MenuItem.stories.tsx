import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItem } from './MenuItem';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof MenuItem> = {
	title: 'shared/ui/MenuItem',
	component: MenuItem,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		to: { control: 'text' },
		label: { control: 'text' },
		icon: { control: false },
	},
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

const chevronDownIcon = (
	<svg viewBox="0 0 24 24" fill="none">
		<path
			d="M12 15.9354C11.3539 15.9354 10.7078 15.6862 10.2186 15.197L4.20075 9.17912C3.93308 8.91145 3.93308 8.46842 4.20075 8.20075C4.46842 7.93308 4.91145 7.93308 5.17912 8.20075L11.197 14.2186C11.64 14.6617 12.36 14.6617 12.803 14.2186L18.8209 8.20075C19.0885 7.93308 19.5316 7.93308 19.7992 8.20075C20.0669 8.46842 20.0669 8.91145 19.7992 9.17912L13.7814 15.197C13.2922 15.6862 12.6461 15.9354 12 15.9354Z"
			fill="currentColor"
		/>
	</svg>
);

export const Default: Story = {
	args: {
		label: 'О проекте',
	},
};

export const DefaultWithIcon: Story = {
	args: {
		label: 'О проекте',
		icon: chevronDownIcon,
	},
};

export const AsLink: Story = {
	render: (args) => (
		<MemoryRouter initialEntries={['/info']}>
			<MenuItem {...args} />
		</MemoryRouter>
	),
	args: {
		label: 'О проекте',
		to: '/info',
	},
};

export const AsLinkWithIcon: Story = {
	render: (args) => (
		<MemoryRouter initialEntries={['/info']}>
			<MenuItem {...args} />
		</MemoryRouter>
	),
	args: {
		label: 'О проекте',
		to: '/info',
		icon: chevronDownIcon,
	},
};
