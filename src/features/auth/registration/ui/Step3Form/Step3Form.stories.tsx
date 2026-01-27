import type { Meta, StoryObj } from '@storybook/react-vite';
import { Step3Form } from './Step3Form';

const meta: Meta<typeof Step3Form> = {
	title: 'Features/Auth/Registration/ui/Step3Form',
	component: Step3Form,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Step3Form>;

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
