// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ['**/*.{ts,tsx}'],
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooks,
			import: importPlugin,
			'jsx-a11y': jsxA11y,
		},
		languageOptions: {
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module',
				ecmaFeatures: { jsx: true },
			},
		},
		settings: {
			react: { version: 'detect' },
		},
		rules: {
			'react/react-in-jsx-scope': 'off',
			...reactHooks.configs.recommended.rules,
		},
	},
	{
		ignores: [
			'dist',
			'node_modules',
			'*.config.js',
			'*.config.cjs',
			'.stylelintrc.cjs',
			'vite.config.ts',
		],
	},
	...storybook.configs['flat/recommended'],
];
