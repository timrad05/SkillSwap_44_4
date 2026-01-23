import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModalSuccess } from './ModalSuccess';
import userCircleIcon from '../../shared/assets/icons/user-circle.svg';

const meta = {
	title: 'UI/ModalSuccess',
	component: ModalSuccess,
} satisfies Meta<typeof ModalSuccess>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
	args: {
		icon: (
			<img
				src={userCircleIcon}
				alt=""
				aria-hidden="true"
				width={100}
				height={100}
			/>
		),
		title: 'Ваше предложение создано',
		text: 'Теперь Вы можете предложить обмен',
	},
};
