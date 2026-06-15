import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skill } from './Skill';
import { useState } from 'react';
import type { SkillProps } from './Skill.types';

const meta: Meta<typeof Skill> = {
	title: 'shared/ui/Skill',
	component: Skill,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	argTypes: {
		isLiked: {
			control: 'boolean',
			description: 'Состояние лайка',
		},
		onLikeClick: { action: 'liked' },
		onShareClick: { action: 'shared' },
		onMoreClick: { action: 'more clicked' },
	},
} satisfies Meta<typeof Skill>;

export default meta;
type Story = StoryObj<typeof Skill>;

const defaultImages = [
	'https://upload.wikimedia.org/wikipedia/commons/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg',
	'https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=',
	'https://images.ctfassets.net/pvkenuwtinkd/5avWBzXrPaIzAVLnKfQPhG/62c75fce546a463dc9882b6f4977c15a/K20_GettyImages-1150996895_CMYK.jpg?q=80&w=1600',
	'https://jurlique.com.au/cdn/shop/articles/7_WAYS_TO_MAKE_EVERY_DAY_EARTH_DAY_9c2990e0-c893-4d66-9e7a-29b89c8dcf60.jpg?v=1742172049',
];

// Интерактивная версия
const InteractiveSkillComponent = (
	props: Omit<SkillProps, 'isLiked' | 'onLikeClick'>,
) => {
	const [isLiked, setIsLiked] = useState(false);
	const [isExchangeProposed, setIsExchangeProposed] = useState(
		props.buttonProps.isExchangeProposed || false,
	);

	const handleLikeClick = () => {
		setIsLiked(!isLiked);
	};

	const handleShareClick = () => {
		console.log('Поделиться');
	};

	const handleMoreClick = () => {
		console.log('Еще действия');
	};

	const handleExchangeClick = () => {
		console.log('Кнопка "Предложить обмен" нажата');
		setIsExchangeProposed(true);
	};

	return (
		<Skill
			{...props}
			buttonProps={{
				...props.buttonProps,
				onClick: handleExchangeClick,
				isExchangeProposed,
			}}
			isLiked={isLiked}
			onLikeClick={handleLikeClick}
			onShareClick={handleShareClick}
			onMoreClick={handleMoreClick}
		/>
	);
};

export const Default: Story = {
	render: (args) => <InteractiveSkillComponent {...args} />,
	args: {
		title: 'Игра на барабанах',
		subtitle: 'Творчество и искусство / Музыка и звук',
		description:
			'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры',
		buttonProps: {
			text: 'Предложить обмен',
			onClick: () => console.log('Кнопка "Предложить обмен" нажата'),
			variant: 'primary' as const,
		},
		images: defaultImages,
	},
};

export const WithActiveLike: Story = {
	args: {
		title: 'Игра на барабанах',
		subtitle: 'Творчество и искусство / Музыка и звук',
		description:
			'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры',
		buttonProps: {
			text: 'Предложить обмен',
			onClick: () => console.log('Кнопка "Предложить обмен" нажата'),
			variant: 'primary' as const,
		},
		images: defaultImages,
		isLiked: true,
	},
};

// Пример с другим навыком
export const PhotographySkill: Story = {
	render: (args) => <InteractiveSkillComponent {...args} />,
	args: {
		title: 'Фотография на пленку',
		subtitle: 'Творчество и искусство / Фото и видео',
		description:
			'Научу снимать на пленочные камеры, выбирать пленку под разные условия, проявлять и сканировать пленку самостоятельно. Покажу, как создавать атмосферные кадры с характером и настроением.',
		buttonProps: {
			text: 'Предложить обмен',
			onClick: () => console.log('Кнопка "Предложить обмен" нажата'),
			variant: 'primary' as const,
		},
		images: defaultImages,
	},
};

export const WithExchangeProposed: Story = {
	args: {
		title: 'Игра на барабанах',
		subtitle: 'Творчество и искусство / Музыка и звук',
		description:
			'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без партитуры',
		buttonProps: {
			text: 'Предложить обмен',
			onClick: () => console.log('Кнопка "Предложить обмен" нажата'),
			variant: 'primary' as const,
			isExchangeProposed: true,
		},
		images: defaultImages,
	},
};
