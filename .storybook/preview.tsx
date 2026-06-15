import type { Preview } from '@storybook/react-vite';
import { Provider } from 'react-redux';
import { store } from '../src/app/store/store';
// @ts-expect-error чтобы не создавать файл декларации типов только для отображения шрифтов внтури сторибука
import '../src/shared/styles/index.scss';

const preview: Preview = {
	decorators: [
		(Story) => (
			<Provider store={store}>
				<Story />
			</Provider>
		),
	],
};

export default preview;
