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
	},
};

export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Default: Story = {
	args: {
		label: 'О проекте',
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
