import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { ThemeSwitchButton } from './ThemeSwitchButton';

const meta: Meta<typeof ThemeSwitchButton> = {
	title: 'shared/ui/ThemeSwitchButton',
	component: ThemeSwitchButton,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof ThemeSwitchButton>;

type TTheme = 'light' | 'dark';

const ThemeSwitchComponent = () => {
	const [theme, setTheme] = useState<TTheme>(() => {
		if (typeof window !== 'undefined') {
			return (localStorage.getItem('theme') as TTheme) || 'dark';
		}
		return 'light';
	});

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	const switchTheme = () =>
		setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

	return <ThemeSwitchButton theme={theme} onClick={switchTheme} />;
};

export const SwitchTheme: Story = {
	render: () => <ThemeSwitchComponent />,
};
