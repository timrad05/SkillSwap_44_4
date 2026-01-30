import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillEdit } from './SkillEdit';

const meta: Meta<typeof SkillEdit> = {
	title: 'Widgets/SkillEdit',
	component: SkillEdit,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta<typeof SkillEdit>;

export default meta;
type Story = StoryObj<typeof SkillEdit>;

const defaultImages = [
	'https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg',
	'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
	'https://images.ctfassets.net/pvkenuwtinkd/5avWBzXrPaIzAVLnKfQPhG/62c75fce546a463dc9882b6f4977c15a/K20_GettyImages-1150996895_CMYK.jpg?q=80&w=1600',
	'https://jurlique.com.au/cdn/shop/articles/7_WAYS_TO_MAKE_EVERY_DAY_EARTH_DAY_9c2990e0-c893-4d66-9e7a-29b89c8dcf60.jpg?v=1742172049',
];

const defaultDescription =
	'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры';

export const Default: Story = {
	args: {
		title: 'Игра на барабанах',
		subtitle: 'Творчество и искусство / Музыка и звук',
		description: defaultDescription,
		images: defaultImages,
		onEditClick: () => console.log('Редактировать нажато'),
		onDoneClick: () => console.log('Готово нажато'),
	},
};

export const WithMinimumContent: Story = {
	args: {
		title: 'Кулинария',
		subtitle: 'Дом и быт / Кулинария',
		description:
			'Научу готовить простые и вкусные блюда из доступных продуктов.',
		images: defaultImages,
		onEditClick: () => console.log('Редактировать нажато'),
		onDoneClick: () => console.log('Готово нажато'),
	},
};
