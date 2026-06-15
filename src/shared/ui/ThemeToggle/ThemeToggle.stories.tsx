import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const meta: Meta<typeof ThemeToggle> = {
	title: 'shared/ui/ThemeToggle',
	component: ThemeToggle,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof ThemeToggle>;

type TTheme = 'light' | 'dark';

const ThemeToggleComponent = () => {
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

	return <ThemeToggle theme={theme} onClick={switchTheme} />;
};

export const SwitchTheme: Story = {
	render: () => <ThemeToggleComponent />,
};
