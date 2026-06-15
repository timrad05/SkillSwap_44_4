import type { Meta, StoryObj } from '@storybook/react-vite';
import { LoginForm } from './LoginForm';

const meta: Meta<typeof LoginForm> = {
	title: 'Features/Auth/LoginForm',
	component: LoginForm,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
	args: {},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '400px',
					padding: '24px',
					backgroundColor: 'white',
					borderRadius: '16px',
					boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
				}}
			>
				<Story />
			</div>
		),
	],
};
