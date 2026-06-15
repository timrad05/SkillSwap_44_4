import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step2Form } from './Step2Form';

const meta: Meta<typeof Step2Form> = {
	title: 'Features/Auth/Step2Form',
	component: Step2Form,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Step2Form>;

export const Default: Story = {
	args: {},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '500px',
					padding: '32px',
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

export const WithFilledFields: Story = {
	args: {},
	decorators: [
		(Story) => (
			<div
				style={{
					width: '500px',
					padding: '32px',
					backgroundColor: 'white',
					borderRadius: '16px',
					boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
				}}
			>
				<h3 style={{ marginBottom: '24px', color: '#333' }}>
					Пример заполненной формы
				</h3>
				<Story />
			</div>
		),
	],
};
