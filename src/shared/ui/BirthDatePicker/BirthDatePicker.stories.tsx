import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { BirthDatePicker } from './BirthDatePicker';

const meta: Meta<typeof BirthDatePicker> = {
	title: 'Shared/UI/BirthDatePicker',
	component: BirthDatePicker,
	tags: ['autodocs'],
	argTypes: {
		label: {
			control: 'text',
			description: 'Текст над полем',
		},
		placeholder: {
			control: 'text',
		},
		className: {
			control: false,
		},
	},
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => {
			const [value, setValue] = useState('');
			return (
				<div style={{ width: '360px', padding: '20px' }}>
					<Story args={{ value, onChange: setValue }} />
				</div>
			);
		},
	],
};

export default meta;

type Story = StoryObj<typeof BirthDatePicker>;

export const Default: Story = {
	args: {
		label: 'Дата рождения',
		placeholder: 'дд.мм.гггг',
	},
};
