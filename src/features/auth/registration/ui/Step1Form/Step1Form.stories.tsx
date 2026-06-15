import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step1Form } from './Step1Form';

const meta: Meta<typeof Step1Form> = {
	title: 'Features/Auth/Registration/Step1Form',
	component: Step1Form,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Step1Form>;

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
