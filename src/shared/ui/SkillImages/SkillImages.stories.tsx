import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillImages } from './SkillImages';

const meta: Meta<typeof SkillImages> = {
	title: 'Shared/UI/SkillImages',
	component: SkillImages,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		images: [
			'https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg',
			'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
			'https://images.ctfassets.net/pvkenuwtinkd/5avWBzXrPaIzAVLnKfQPhG/62c75fce546a463dc9882b6f4977c15a/K20_GettyImages-1150996895_CMYK.jpg?q=80&w=1600',
			'https://jurlique.com.au/cdn/shop/articles/7_WAYS_TO_MAKE_EVERY_DAY_EARTH_DAY_9c2990e0-c893-4d66-9e7a-29b89c8dcf60.jpg?v=1742172049',
			'https://s3-eu-north-1.amazonaws.com/py3.visitsweden.com/original_images/20180730-gsta_reiland-sunrays_in_a_pine_forest-6901-2_CMSTemplate.jpg',
			'https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg',
		],
	},
};

export const MinimumImages: Story = {
	args: {
		images: [
			'https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg',
			'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
			'https://images.ctfassets.net/pvkenuwtinkd/5avWBzXrPaIzAVLnKfQPhG/62c75fce546a463dc9882b6f4977c15a/K20_GettyImages-1150996895_CMYK.jpg?q=80&w=1600',
			'https://jurlique.com.au/cdn/shop/articles/7_WAYS_TO_MAKE_EVERY_DAY_EARTH_DAY_9c2990e0-c893-4d66-9e7a-29b89c8dcf60.jpg?v=1742172049',
		],
	},
};

export const NoImages: Story = {
	args: {
		images: [],
	},
};
