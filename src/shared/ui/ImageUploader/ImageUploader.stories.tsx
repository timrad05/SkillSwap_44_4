import type { Meta, StoryObj } from '@storybook/react-vite';
import { ImageUploader } from './ImageUploader';

const meta: Meta<typeof ImageUploader> = {
	title: 'shared/ui/ImageUploader',
	component: ImageUploader,
	tags: ['autodocs'],
	argTypes: {
		multiple: { control: 'boolean' },
		disabled: { control: 'boolean' },
		onFilesChange: { action: 'files changed' },
	},
} satisfies Meta<typeof ImageUploader>;

export default meta;
type Story = StoryObj<typeof ImageUploader>;

export const Default: Story = {
	args: {
		multiple: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const SingleFile: Story = {
	args: {
		multiple: false,
	},
};
