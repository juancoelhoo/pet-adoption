module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	transform: {
	  '^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
	testPathIgnorePatterns: ['/node_modules/'],
	moduleNameMapper: {
	  '^@src/(.*)$': '<rootDir>/src/$1',
	},
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageReporters: ['text', 'lcov'],
  };
  