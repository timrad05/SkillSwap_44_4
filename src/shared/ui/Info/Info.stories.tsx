import type { Meta, StoryObj } from '@storybook/react-vite';
import { Info } from './Info';

const meta: Meta<typeof Info> = {
	title: 'Shared/UI/Info',
	component: Info,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
};

export default meta;
type Story = StoryObj<typeof Info>;

export const Step1: Story = {
	args: {
		image: 'src/shared/assets/images/light-bulb.png', // путь к вашему изображению
		title: 'Добро пожаловать в SkillSwap!',
		text: 'Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми',
	},
};

export const ErrorPage400: Story = {
	args: {
		image: 'src/shared/assets/images/error-404.png', // для страниц ошибок
		title: 'Страница не найдена',
		text: 'К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже',
	},
};

export const ErrorPage500: Story = {
	args: {
		image: 'src/shared/assets/images/error-500.png', // для страниц ошибок
		title: 'На сервере произошла ошибка',
		text: 'Попробуйте позже или вернитесь на главную страницу',
	},
};
