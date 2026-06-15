import type { Config } from 'jest';

const config: Config = {
	testEnvironment: 'jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	testMatch: ['**/?(*.)+(spec|test).(ts|tsx)'],
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	transform: {
		'^.+\\.(ts|tsx)$': [
			'ts-jest',
			{ tsconfig: '<rootDir>/tsconfig.jest.json' },
		],
	},
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
	},
};

export default config;
