import type { Preview } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { store } from '../src/app/store/store';

const preview: Preview = {
	decorators: [
		(Story) => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],

	parameters: {
		a11y: {
			// 'todo' - show a11y violations in the test UI only
			// 'error' - fail CI on a11y violations
			// 'off' - skip a11y checks entirely
			test: 'todo',
		},
	},
};

export default preview;
