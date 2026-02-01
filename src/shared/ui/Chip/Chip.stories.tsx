import type { Meta, StoryObj } from '@storybook/react-vite';
import Chip from './Chip';
import type { ChipProps } from './Chip.types';

const meta: Meta<typeof Chip> = {
	title: 'Shared/ui/Chip',
	component: Chip,
	parameters: {
		layout: 'centered',
	},
	tags: ['autodocs'],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof Chip>;

const ChipWithBackground = (props: ChipProps) => (
	<div
		style={{
			padding: '20px',
			backgroundColor: '#F9FAF7',
			borderRadius: '8px',
		}}
	>
		<Chip {...props} />
	</div>
);

export const Default: Story = {
	render: (args) => <ChipWithBackground {...args} />,
	args: {
		label: 'JavaScript',
		onRemove: () => console.log('Chip removed'),
	},
};

export const LongText: Story = {
	render: (args) => <ChipWithBackground {...args} />,
	args: {
		label: 'Очень длинное название навыка для демонстрации',
		onRemove: () => console.log('Chip removed'),
	},
};

export const MultipleChips: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '8px',
				flexWrap: 'wrap',
				maxWidth: '800px',
				padding: '20px',
				backgroundColor: '#F9FAF7',
				borderRadius: '8px',
			}}
		>
			<Chip
				label="JavaScript"
				onRemove={() => console.log('JavaScript removed')}
			/>
			<Chip
				label="Хочу научиться"
				onRemove={() => console.log('Хочу научиться removed')}
			/>
			<Chip
				label="Английский"
				onRemove={() => console.log('Английский removed')}
			/>
			<Chip label="Node.js" onRemove={() => console.log('Node.js removed')} />
		</div>
	),
};

export const WithClickAction: Story = {
	render: (args) => <ChipWithBackground {...args} />,
	args: {
		label: 'Нажмите крестик →',
		onRemove: () => {
			console.log('Чипс удален!');
			alert('Чипс был удален! Проверь консоль браузера.');
		},
	},
};
